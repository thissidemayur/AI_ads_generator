import {
  ApiError,
  type IMemberRepository,
  type ISessionRepository,
  type IUserRepository,
  type IUserService,
  type IWorkspaceRepository,
} from "@project/shared";
import { PrismaClient, Role, type Prisma, type User } from "@project/shared/server";
import type { WorkspaceService } from "./workspace.service";
import type Redis from "ioredis";
import type { QueueService } from "./queue.service";
import crypto from "node:crypto";

export class UserService implements IUserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userRepo: IUserRepository,
    private readonly workspaceRepo: IWorkspaceRepository,
    private readonly redis: Redis,
    private readonly queueService: QueueService,
    private readonly memberRepo: IMemberRepository,
    private readonly sessionsRepo: ISessionRepository,
  ) {}

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const { passwordHash, ...safeUser } = user;
    return safeUser as User;
  }

  async changePassword(
    userId: string,
    currentPass: string,
    newPass: string,
  ): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const isMatch = await Bun.password.verify(currentPass, user.passwordHash);
    if (!isMatch) throw new ApiError(400, "Current password is incorrect");

    const newHash = await Bun.password.hash(newPass);

    // update DB and increase version(incrementing version acts as a "Force Logout" for other devices)
    await this.userRepo.updatePassword(userId, newHash);
    await this.userRepo.incrementVersion(userId);
  }

  async deleteAccount(userId: string): Promise<void> {
    const userWorkspaces = await this.memberRepo.findByUser(userId);

    await this.prisma.$transaction(async (tx) => {
      for (const membership of userWorkspaces) {

        if (membership.role === Role.OWNER || membership.role === Role.ADMIN) {
          const memberCount = await this.memberRepo.countByWorkspace(
            membership.tenantId,
          );

          if (memberCount === 1) {
            await this.workspaceRepo.deleteWithTx(tx, membership.tenantId);
          } else {
            throw new ApiError(
              400,
              `Cannot delete account. You are the role admin of "${membership.tenant?.name || "a workspace"}". Transfer ownership first.`,
            );
          }
        }
      }

      await this.userRepo.deleteWithTx(tx, userId);
      await this.sessionsRepo.deleteAllForUser(userId);
    });
    // Cleanup Redis (Outside transaction is fine)
    await this.redis.del(`user:sessions:${userId}`);
  }

  async terminateAllSession(userId: string): Promise<void> {
    // incrementing the version cause the authMiddleware to reject all current JWTs
    await this.userRepo.incrementVersion(userId);

    // DB cleanup (Remove refreshToken records)
    await this.sessionsRepo.deleteAllForUser(userId);

    // CLear redis cache to delete store session
    await this.redis.del(`user:sessions:${userId}`);
  }

  async updateProfile(
    userId: string,
    data: Partial<Prisma.UserUpdateInput>,
  ): Promise<User> {
    if (data.email) {
      const email = data.email;
      const exisiing = await this.userRepo.findByEmail(email as string);
      if (exisiing && exisiing.id !== userId) {
        throw new ApiError(400, "Email is already taken by another account");
      }
    }
    const updatedUser = await this.userRepo.update(userId, data);
    const { passwordHash, ...safeUser } = updatedUser;

    return safeUser as User;
  }

  async requestEmailChange(userId: string, newEmail: string): Promise<void> {
    const exisitng = await this.userRepo.findByEmail(newEmail);
    if (exisitng) throw new ApiError(400, "Email aready in use");

    const otp = crypto.randomInt(100000, 999999);

    // store the pending change in redis
    await this.redis.set(
      `email_change:${userId}`,
      JSON.stringify({ newEmail, otp }),
      "EX",
      1800,
    ); // 30min

    await this.queueService.addEmailJob({
      to: newEmail,
      type: "VERIFY_EMAIL",
      name: "User",
      payload: {
        otp,
      },
    });
  }

  async emailChange(userId: string, otp: number) {
    const rawData = await this.redis.get(`email_change:${userId}`);
    if (!rawData) {
      throw new ApiError(
        400,
        "Request expired or not found. Please try again.",
      );
    }

    const { newEmail, otp: storedOtp } = JSON.parse(rawData);

    if (storedOtp !== otp) {
      throw new ApiError(400, "Invalid verification code.");
    }

    await this.userRepo.updateEmail(userId, newEmail);

    await this.redis.del(`email_change:${userId}`);

    // Changing email is a major security event; force logout of other sessions
    await this.userRepo.incrementVersion(userId);
  }
}
