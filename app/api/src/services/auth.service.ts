import {
  ApiError,
  type AuthResponseDTO,
  type IAuthService,
  type IMemberRepository,
  type IQueueService,
  type ISessionRepository,
  type ITokenServcice,
  type IUserRepository,
  type IWorkspaceService,
  type loginDTO,
  type RegisterDTO,
} from "@project/shared";
import type Redis from "ioredis";
import crypto from "node:crypto"

import { randomInt } from "node:crypto";
import { env } from "../config/env";
import { promise } from "zod";
import { Role, type PrismaClient } from "@project/shared/server";
export class AuthService implements IAuthService {
  constructor(
    private readonly db: PrismaClient, // needed for transactions
    private readonly userRepo: IUserRepository, // db interaction
    private readonly queueService: IQueueService, //   bullmq wrapper
    private readonly sessionRepo: ISessionRepository,
    private readonly redis: Redis,
    private readonly tokenService: ITokenServcice,
    private readonly memberRepo: IMemberRepository,
    private readonly workspaceService: IWorkspaceService
  ) {}

  // register user
  async register(data: RegisterDTO) {
    try {
      await this.applyRateLimit(`limit:register:${data.email}`, 5, 3600);

      const existingUser = await this.userRepo.findByEmail(data.email);
      if (existingUser) throw new ApiError(400, "Email already in use");

      // heavy lifting
      const passwordHash = await Bun.password.hash(data.password);

      // atomic transicition
      const result = await this.db.$transaction(async (tx) => {
             // create the user
         const user =   await this.userRepo.createWithTx(tx,{...data,passwordHash})
             // create tenant(workspace) with memeber(all user releated to that tenant)
        const tenant =await this.workspaceService.createWorkspaceWithTx(user.id, `${data.firstName}'s workspace`)

        return { user, tenant };
      });

      // verification Email
      const otp = this.generateOTP();
      await this.redis.set(`temp:verify:${result.user.email}`, otp, "EX", 900); //15 min

      await this.queueService.addEmailJob({
        to: result.user.email,
        type: "VERIFY_EMAIL",
        name:result.user.firstName || "User",
        payload: { otp },
      });

      return {
        tenantId: result.tenant.id,
        userId: result.user.id,
      };
    } catch (error) {
      // if (
      //   error instanceof Prisma.PrismaClientUnknownRequestError &&
      //   error?.code === "P2002"
      // ) {
      //   throw new ApiError(
      //     400,
      //     "This email is already registered. Try logging in.",
      //   );
      // }

      throw error;
    }
  }

  //   login
  async login(data: loginDTO): Promise<AuthResponseDTO> {

    await this.applyRateLimit(`limit:login:${data.email}`, 10, 1800); //10 attempts 30 min
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isPasswordValid = await Bun.password.verify(
      data.password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

    // status check
    if (!user.isVerified)
      throw new ApiError(403, "Please verify your email first");

    // Context selection (the workspace)
    // we fetch memberships to dind the 'Last Used' or 'default one
    const memberships = await this.memberRepo.findAllByUserId(user.id);
    if (memberships.length === 0) {
      throw new ApiError(404, "No workspaces found for this account.");
    }

    const activeMember = memberships[0];

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      tenantId: activeMember?.tenantId as string,
      role: activeMember?.role as Role,
      version: user.tokenVersion,
    });

    const refreshToken = this.tokenService.generateRefreshToken();

    //  state persistence (Redis+postgres)
    await this.persistSession({
      refreshToken,
      userId: user.id,
      tenantId: activeMember?.tenantId as string,
      role: activeMember?.role as Role,
      tokenVersion: user.tokenVersion,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user?.firstName as string,
      },
      tenant: {
        id: activeMember?.tenantId as string,
        name: activeMember?.tenant.name as string,
        role: activeMember?.role as Role,
      },
      accessToken,
      refreshToken,
    };
  }

  // verify email
  async verifyEmail(email: string, otp: string): Promise<AuthResponseDTO> {
    // 1. Rate Limit Check (Assume a helper method or middleware handles this)

    const otpRedisKey = `temp:verify:${email}`;
    const cachedOtp = await this.redis.get(otpRedisKey);
    if (!cachedOtp) throw new ApiError(400, "OTP expired or not requested");
    if (cachedOtp !== otp.toString()) {
      throw new ApiError(401, "Invalid OTP");
    }

    //   Success Path: Atomic Update & Token Generation
    const result = await this.db.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { email },
        data: { isVerified: true },
      });

      // get their initalWorkspace (created during register)
      const memberships = await this.memberRepo.findAllByUserId(user.id, tx);
      return { user, activeMember: memberships[0] };
    });

    await this.redis.del(otpRedisKey);

    // Issue access & refresh token (UX: auto-login)
    const accessToken = this.tokenService.generateAccessToken({
      role: result.activeMember?.role as Role,
      tenantId: result.activeMember?.tenantId as string,
      userId: result.user.id,
      version: result.user.tokenVersion,
    });
    const refreshToken = this.tokenService.generateRefreshToken();

    // store session in redis
    await this.persistSession({
      refreshToken,
      userId: result.user.id,
      tenantId: result.activeMember?.tenantId as string,
      role: result.activeMember?.role as Role,
      tokenVersion: result.user.tokenVersion,
    });

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user?.firstName as string,
      },
      tenant: {
        id: result.activeMember?.tenantId as string,
        name: result.activeMember?.tenant.name as string,
        role: result.activeMember?.role as Role,
      },
      accessToken,
      refreshToken,
    };
  }

  // resemd verification email
  // usinng Layered rate limmiting- we created fixed window and a cool-down buffer
  async resendVerification(email: string): Promise<void> {
    //cooldown rate limit -> max 1 rqst per 60 second
    const coolDownRedisKey = `limit:resend:${email}`;
    const isCollingDown = await this.redis.get(coolDownRedisKey);
    if (isCollingDown) {
      throw new ApiError(
        429,
        "Please wait 60 seconds before requesting another code",
      );
    }

    // 15 min rate limit(increments the counters)
    await this.applyRateLimit(`limit:resend-otp:${email}`, 3, 900); //15min
    const user = await this.userRepo.findByEmail(email);

    //  Silent Fail for Security: If user doesn't exist OR is already verified,
    // we return "Success" anyway so hackers can't "fish" for emails.
    if (!user || user.isVerified) return;

    const otp = this.generateOTP();
    const otpRedisKey = `temp:verify:${email}`;
    await this.redis.set(otpRedisKey, otp, "EX", env.VERIFY_OTP_EXPIRES_TIME); //expiry within

    //   set 60 sec cool down
    await this.redis.set(coolDownRedisKey, "true", "EX", 60);

    // Queue the email
    await this.queueService.addEmailJob({
      to: email,
      type: "VERIFY_EMAIL",
      name: user.firstName || "User",
      payload: { otp },
    });
  }

  // roatae refresh session
  async refreshSession(refreshToken: string): Promise<AuthResponseDTO> {
    const hashedOldToken = Bun.SHA256.hash(refreshToken, "hex");
    const oldSessionKey = `auth:session:${hashedOldToken}`;

    // 1. Fetch Session from Redis
    const sessionData = await this.redis.get(oldSessionKey);
    if (!sessionData) {
      throw new ApiError(401, "Session expired or reused. Please login again.");
    }

    const session = JSON.parse(sessionData);

    // 2. Tier 2 Check (Global Kill Switch)
    const currentVersion = await this.userRepo.getCurrentVersion(
      session.userId,
    );
    if (currentVersion > session.tokenVersion) {
      await this.redis.del(oldSessionKey);
      throw new ApiError(401, "Security update required. Please login.");
    }

    // 3. Fetch Fresh Data (names/roles change!)
    const [user, member] = await Promise.all([
      this.userRepo.findById(session.userId),
      this.memberRepo.findMember(session.userId, session.tenantId),
    ]);

    if (!user || !member) throw new ApiError(401, "Session invalid");

    // 4. Generate New Pair
    const newAccessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      tenantId: member.tenantId,
      role: member.role,
      version: user.tokenVersion,
    });
    const newRefreshToken = this.tokenService.generateRefreshToken();

    // 5. ATOMIC SWAP: The Rotation
    // Use SREM to remove the OLD key from the user's active set
    await Promise.all([
      this.redis.del(oldSessionKey),
      this.redis.srem(`auth:user-sessions:${user.id}`, oldSessionKey),
      this.sessionRepo.deleteByToken(hashedOldToken), // Sync Postgres audit log
    ]);

    // Persist the NEW session (this adds it to Redis and the Set)
    await this.persistSession({
      refreshToken: newRefreshToken,
      userId: user.id,
      tenantId: member.tenantId,
      role: member.role,
      tokenVersion: user.tokenVersion,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: { id: user.id, email: user.email, firstName: user.firstName ?? "" },
      tenant: {
        id: member.tenantId,
        name: (member as any).tenant?.name, // From repo include
        role: member.role,
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    // hash the token to find redis key
    const hashedToken = Bun.SHA256.hash(refreshToken, "hex");
    const sessionKey = `session:${hashedToken}`;

  //  fetch sesison first to get the userId
  // need user id to gind the correct set`auth:session:${userId}`
  const sessionData = await this.redis.get(sessionKey)
  if(sessionData) {
    const session = JSON.parse(sessionData)
    const userSessionSetKey = `auth:session:${session.id}`

    // attomic cleanup
    await Promise.all([
      this.redis.del(sessionKey), // delete the actual session data
      this.redis.srem(userSessionSetKey, sessionKey), //Remove THIS key from the User's device list
      this.sessionRepo.deleteByToken(hashedToken), // Remove from Postgres Audit Log
    ]);
  }
  }

  // forget password (we send ticket to the user email)
  async forgetPassword(email: string): Promise<void> {
    await this.applyRateLimit(`limit:forget-password:${email}`, 3, 3600); //1 hour

    const user = await this.userRepo.findByEmail(email);
    console.log("user: ",user)
    if (!user) return; // security: silent fail if user doesnot exist to prevent email enumeration

    // genereate high entropy token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = Bun.SHA256.hash(resetToken, "hex");

    await this.redis.set(
      `reset-password:${hashedResetToken}`,
      user.id,
      "EX",
      3600,
    ); //1 hour

    // queue
    console.log(
      "PASSWORD:RESET:  ",
      `${env.FRONTEND_URL}/reset-password?token=${resetToken}`,
    );
    await this.queueService.addEmailJob({
      to: email,
      type: "PASSWORD_RESET",
      name: user.firstName ?? "User",
      payload: {
        link: `${env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      },
    });
  }

  // reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = Bun.SHA256.hash(token, "hex");

    const redisKey = `reset-password:${hashedToken}`;
    const userId = await this.redis.get(redisKey);

    const passwordHash = await Bun.password.hash(newPassword);
    if (!userId) throw new ApiError(400, "Reset link invalid or expired");
    // Atomic Update: change password + increment version
    // incrementingg version ensure old sessions are killed after password change
    // cleanup
    await Promise.all([ await this.userRepo.updatePassword(userId, passwordHash),    await this.userRepo.incrementVersion(userId) ]);
    
    await Promise.all([
      this.redis.del(redisKey),
      this.redis.del(`user:version:${userId}`),
    ]);

    
  }

  //

  async revokeAllSessions(userId: string): Promise<void> {
    const userSessionSetKey = `auth:user-sessions:${userId}`;
    const versionKey = `auth:user-version:${userId}`;

    // 1. Get all session keys tied to this user from the Redis SET
    const sessionKeys = await this.redis.smembers(userSessionSetKey);

    // 2. Perform Redis Cleanup
    if (sessionKeys.length > 0) {
      await Promise.all([
        this.redis.del(...sessionKeys), // Delete every individual session:hash key
        this.redis.del(userSessionSetKey), // Delete the SET itself
        this.redis.del(versionKey), // Clear Tier 2 cache
      ]);
    }

    // 3. Update Database (Atomic Increment)
    // This makes all current JWTs invalid instantly
    await this.userRepo.incrementVersion(userId);

    // 4. Cleanup Persistence Layer
    await this.sessionRepo.deleteByUserId(userId);
  }

  //   ======================== HELPER METHOD ========================

  private generateOTP() {
    const otp = randomInt(100000, 1000000);
    return otp;
  }

  // store data in both redis and postgress
  private async persistSession(session: {
    refreshToken: string;
    userId: string;
    tenantId: string;
    role: Role;
    tokenVersion: number;
  }) {
    const hashedRefreshToken = Bun.SHA256.hash(session.refreshToken, "hex");

    const { refreshToken, ...sessionMetadata } = session;

    // Consistent Keys
    const sessionKey = `auth:session:${hashedRefreshToken}`;
    const userSessionSetKey = `auth:user-sessions:${session.userId}`;
    const versionKey = `auth:user-version:${session.userId}`;

    await Promise.all([
      // 1. Store the session data
      this.redis.set(sessionKey, JSON.stringify(session), "EX", 604800),

      // 2. Add this session to the user's set of active devices
      this.redis.sadd(userSessionSetKey, sessionKey),

      // 3. Set the global version for middleware
      this.redis.set(versionKey, session.tokenVersion.toString(), "EX", 604800),

      //  Postgres Audit Log
      this.sessionRepo.create({
        refreshToken: hashedRefreshToken,
        userId: session.userId,
        expiresAt: new Date(Date.now() + 604800000),
      }),
    ]);
  }

  // rate limiter
  private async applyRateLimit(
    key: string,
    limit: number,
    durationInSeconds: number,
  ): Promise<void> {
    const attempts = await this.redis.incr(key);
    // set ttl onlu on the first attempts to create a "Fixed Window"
    if (attempts === 1) {
      await this.redis.expire(key, durationInSeconds);
    }

    if (attempts > limit) {
      // calculate remaning time for better error msg
      const ttl = await this.redis.ttl(key);
      const minutes = Math.ceil(ttl / 60);
      throw new ApiError(
        429,
        `Too many attempts. Please try again in ${minutes} minutes.`,
      );
    }
  }
}
