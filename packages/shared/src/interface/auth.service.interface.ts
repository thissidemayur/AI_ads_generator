import type { AuthResponseDTO, loginDTO, RegisterDTO } from "../dtos/auth.dto";



export interface IAuthService {
  /**
   * Orchestrates Tenant creation, user creation, and memeber linking
   * triggers the end "verificaiton email" event
   */
  register(data: RegisterDTO): Promise<{ userId: string; tenantId: string }>;

  /**
   * validate otp from redis. update DB isVerified:true
   */
  verifyEmail(email: string, otp: string): Promise<AuthResponseDTO>;

  /**
   * checks credentails,fetches the active tenant, and prepares the session data for redis
   */
  login(data: loginDTO): Promise<AuthResponseDTO>;

  /**
   * uses the refresh token to rotate sessions
   * this is where "REUSE DETECTION" happens
   */
  refreshSession(refreshToken: string): Promise<AuthResponseDTO>;

  /**
   * Invalidate the specific session in redis
   */
  logout(refreshToken: string): Promise<void>;

  /**
   * The "KILL SWITCH "- Increments tokenVersion in DB to boot all device
   */
  revokeAllSessions(userId: string): Promise<void>;

  /**
   * sent secreat token to user's email to reset password
   */
  forgetPassword(email: string): Promise<void>;

  /**
   * reset password using reset link 
   */
  resetPassword(token: string,newPassword:string): Promise<void>;

  resendVerification(email: string): Promise<void>;
}