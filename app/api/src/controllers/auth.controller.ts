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
    // hybdird delivery: Set accessToken as cookies and return JSON
    this.setAccessCookie(res,result.accessToken)
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
    console.log("dto: ", req.body);
    const result = await this.authService.login(req.body);
    console.log("result: ", result);
    const data = {
      accessToken: result.accessToken,
      user: result.user,
      tenant: result.tenant,
    };
    this.setRefreshCookie(res, result.refreshToken);

    // hybdird delivery: Set accessToken as cookies and return JSON
    this.setAccessCookie(res, result.accessToken);

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

    // hybdird delivery: Set accessToken as cookies and return JSON
this.setRefreshCookie(res, result.refreshToken);
this.setAccessCookie(res, result.accessToken);

return res
      .status(200)
      .json(new ApiResponse(200, "Session refreshed successfully.", data));
  }
  );

  logout = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    console.log("token: ",token)
    if (token) {
      await this.authService.logout(token);
    }

    // clear cookies
  res.clearCookie("refreshToken", { path: "/" });
  res.clearCookie("accessToken", { path: "/" });

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
      path: "/", 
      maxAge: env.JWT_REFRESH_SECRET_EXPIRE,
    });
  }

  private setAccessCookie(res:Response, token:string) {
    res.cookie("accessToken",token,{
      httpOnly:true, //prevent xss
      secure:env.NODE_ENV ==="production",
      sameSite:"lax",
      path:"/",
      maxAge:env.JWT_ACCESS_SECRET_EXPIRE
    })
  }
}