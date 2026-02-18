import { ApiError, ApiResponse, type IAuthController, type IAuthService } from "@project/shared";
import {type NextFunction, type  Request, type Response } from "express";
import { env } from "../config/env";
import { asyncHandler } from "@project/shared/server";

export class AuthController implements IAuthController {
  constructor(private readonly authService: IAuthService) {}

  // register controller
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Registration successful. Please verify your email.",
          result,
        ),
      );
  });

  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const result = await this.authService.verifyEmail(email, otp);

    this.setRefreshCookie(res, result.refreshToken);
    const data = {
      accessToken: result.accessToken,
      user: result.user,
      tenant: result.tenant,
    };
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Email verified and logged in successfully", data),
      );
  });

  //   login
  login = asyncHandler(async (req: Request, res: Response) => {
    console.log("dto: ",req.body)
    const result = await this.authService.login(req.body);
    console.log("result: ",result)
    const data = {
      accessToken: result.accessToken,
      user: result.user,
      tenant: result.tenant,
    };
    this.setRefreshCookie(res,result.refreshToken)
    return res
      .status(200)
      .json(new ApiResponse(200, "Logged in Successfully", data));
  });

  //   refresh
  refresh = asyncHandler(async (req: Request, res: Response) => {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken) throw new ApiError(401, "Session expired or invalid");

    const result = await this.authService.refreshSession(oldToken);
    const data = {
      accessToken: result.accessToken,
      user: result.user,
      tenant: result.tenant,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Session refreshed successfully.", data));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    console.log("token: ",token)
    if (token) {
      await this.authService.logout(token);
    }

    // clear cookies
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/refresh",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Logged out successfully"));
  });

  forgetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.authService.forgetPassword(email);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "If an account exists, a reset link has been sent.",
        ),
      );
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    await this.authService.resetPassword(token, newPassword);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Password has been reset successfully. You can now login.",
        ),
      );
  });

  resendVerification = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.authService.resendVerification(email);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "A new verification code has been sent if the email is valid.",
        ),
      );
  });

  //   ================ HELPER FUNCTION ================
  private setRefreshCookie(res: Response, token: string) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/refresh", //If we didn't specify /api/auth/refresh, the browser would send the refreshToken (the 40-byte secret) with every single request to the API.
      maxAge: env.JWT_REFRESH_SECRET_EXPIRE,
    });
  }
}