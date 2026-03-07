import {
  ApiError,
  ApiResponse,
  type IAuthController,
  type IAuthService,
} from "@project/shared";
import { type Request, type RequestHandler, type Response } from "express";
import { env } from "../config/env";
import { asyncHandler } from "@project/shared/server";
import * as arctic from "arctic";
import { googleProvider } from "../config/google.oauth.config";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

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

  googleLogin = asyncHandler(async (req: Request, res: Response) => {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const url = googleProvider.createAuthorizationURL(
      state,
      codeVerifier,
      scopes,
    );
    res.cookie("google_oauth_state", state, {
      httpOnly: true,
      path: "/",
      secure: env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 10 * 1000,
    });
    res.cookie("google_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: env.NODE_ENV === "production" ? true : false,
      path: "/",
      maxAge: 60 * 10 * 1000, //10min
    });

    return res.redirect(url.toString());
  });

  googleCallback = asyncHandler(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const state = req.query.state as string;
    const storedState = req.cookies.google_oauth_state;
    const storedCodeVerifier = req.cookies.google_code_verifier;

    if (
      !code ||
      !state ||
      storedState !== state ||
      storedCodeVerifier === null
    ) {
      throw new ApiError(400, "Invalid state or code");
    }

    try {
      const tokens = await googleProvider.validateAuthorizationCode(
        code,
        storedCodeVerifier,
      );
      const accessToken = tokens.accessToken();
      const accessTokenExpiresAt = tokens.accessTokenExpiresAt();

      const response = await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const googleUser:any = await response.json();
      const result = await this.authService.validateSocailLogin({
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        provider: "GOOGLE",
        providerId: googleUser.sub,
      });

      res.clearCookie("google_oauth_state");
      res.clearCookie("google_code_verifier");

      this.setRefreshCookie(res, result.refreshToken);
      this.setAccessCookie(res, result.accessToken);
      this.setTenantCookie(res, result.tenant.id);

      // redirect back
      return res.redirect(`${env.FRONTEND_URL}/dashboard`);
    } catch (error) {
      if (error instanceof arctic.OAuth2RequestError) {
        const errorCode = error.code;
        const errorMsg = error.message;
        const errorName = error.name;
        const errorDescription = error.description;
        const errorStack = error.stack;
        console.error(
          `[ERROR_during_GOOGLE_CALLBACK]; errorCode: ${errorCode}  ||  errorName: ${errorName} || errorMessage: ${errorMsg} || errorDescription: ${errorDescription}`,
        );
        console.error(`Error Stack: ${errorStack}`);
        throw new ApiError(
          400,
          "Google authentication failed: Invalid credentials.",
        );
      }

      throw error;
    }
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
