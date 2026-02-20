import type { User } from "../database";

export interface IUserService {
  getUserProfile(userId: string): Promise<User>;
  changePassword(
    userId: string,
    currentPass: string,
    newPass: string,
  ): Promise<void>;
  updateProfile(
    userId: string,
    data: Partial<Pick<User, "firstName" | "lastName">>,
  ): Promise<User>;

  // Add these missing methods:
  deleteAccount(userId: string): Promise<void>;
  terminateAllSession(userId: string): Promise<void>;
  requestEmailChange(userId: string, newEmail: string): Promise<void>;
  emailChange(userId: string, otp: number): Promise<void>;
}
