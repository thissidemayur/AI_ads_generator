import { asyncHandler } from "@project/shared/server";
import type { UserService } from "../services/user.service";
import {type Request, type Response } from "express";
import { ApiResponse } from "@project/shared";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const user = await this.userService.getUserProfile(userId);
    res.status(200).json(new ApiResponse(200, "Profile retrieved", user));
  });

  updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.authUser.userId;

    await this.userService.changePassword(userId, currentPassword, newPassword);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Password updated successfully. Please login again.",
        ),
      );
  });

  terminateSessions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    await this.userService.terminateAllSession(userId);
    res
      .status(200)
      .json(
        new ApiResponse(200, "All sessions terminated. Please login again."),
      );
  });

  deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    await this.userService.deleteAccount(userId);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Account and associated data deleted successfully.",
        ),
      );
  });

  requestEmailChange = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const { newEmail } = req.body;
    await this.userService.requestEmailChange(userId, newEmail);
    res
      .status(200)
      .json(new ApiResponse(200, "Verification code sent to your new email."));
  });

  updateMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const updatedUser = await this.userService.updateProfile(userId, req.body);
  
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Profile updated successfully",
         updatedUser ,
        ),
      );
  });

  emailChange = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const { otp } = req.body;

    // Note: Converting string OTP from body to number if your service expects number
    await this.userService.emailChange(userId, Number(otp));

    res
      .status(200)
      .json(
        new ApiResponse(200, "Email updated successfully. Please login again."),
      );
  });
}