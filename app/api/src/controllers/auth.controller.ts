import {
  ApiError,
  ApiResponse,
  type IAuthController,
  type IAuthService,
} from "@project/shared";
import { type Request, type Response } from "express";
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
    this.setAccessCookie(res, result.accessToken);
    this.setTenantCookie(res, result.tenant.id);
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
    const result = await this.authService.login(req.body);
    const data = {
      accessToken: result.accessToken,
      user: result.user,
      tenant: result.tenant,
    };
    this.setRefreshCookie(res, result.refreshToken);

    // hybdird delivery: Set accessToken as cookies and return JSON
    this.setAccessCookie(res, result.accessToken);
    this.setTenantCookie(res, result.tenant.id);
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
      refreshToken: result.refreshToken,
      tenant: result.tenant,
    };

    // hybdird delivery: Set accessToken as cookies and return JSON
    if (result.refreshToken) {
      this.setRefreshCookie(res, result.refreshToken);
    }
    if (result.accessToken) {
      this.setAccessCookie(res, result.accessToken);
    }
    if (result.tenant) {
      this.setTenantCookie(res, result.tenant.id);
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Session refreshed successfully.", data));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (token) {
      await this.authService.logout(token);
    }

    // clear cookies
    res.clearCookie("refreshToken", { path: "/" });
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("activeTenantId", { path: "/" });
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

  parseToMs = (time: string | number): number => {
    if (typeof time === "number") return time * 1000;

    const unit = time.toLowerCase();
    const value = parseInt(unit);

    if (isNaN(value)) return 60 * 1000;
    if (unit.endsWith("m")) return value * 60 * 1000;
    if (unit.endsWith("h")) return value * 60 * 60 * 1000;
    if (unit.endsWith("d")) return value * 24 * 60 * 60 * 1000;
    if (unit.endsWith("s")) return value * 1000;

    return value * 1000;
  };
  
  private setRefreshCookie(res: Response, token: string) {
    const ttl = this.parseToMs(env.JWT_REFRESH_SECRET_EXPIRE);

    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ttl,
    });
  }

  private setAccessCookie(res: Response, token: string) {
    const ttl = this.parseToMs(env.JWT_ACCESS_SECRET_EXPIRE);
    res.cookie("accessToken", token, {
      httpOnly: true, //prevent xss
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ttl,
    });
  }

  private setTenantCookie(res: Response, tenantId: string) {
    res.cookie("activeTenantId", tenantId, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
}
