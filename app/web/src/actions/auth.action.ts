"use server";

import { authService } from "@/services/auth.service";
import { env } from "@/lib/env";
import {
  forgetPasswordDTO,
  loginDTO,
  RegisterDTO,
  resendVerificationDTO,
  resetPasswordDTO,
  verifyEmailDTO,
} from "@project/shared/client";
import { cookies } from "next/headers";
import axios from "axios";

/**
 * Shared helper to synchronize cookies between Express response and Next.js store.
 * This ensures fetchServer and Middleware have immediate access to credentials.
 */
async function syncSession(
  accessToken: string,
  tenantId: string,
  setCookieHeaders: string[] | undefined,
) {
  const cookieStore = await cookies();

  // 1. Set Access Token (Required for fetchServer server-to-server calls)
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60, // 15 minutes
  });

  // 2. Set Active Tenant ID (Required for Workspace context/headers)
  cookieStore.set("activeTenantId", tenantId, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // 3. Proxy the Refresh Token from Express Set-Cookie headers
  if (setCookieHeaders) {
    const refreshCookie = setCookieHeaders.find((c) =>
      c.startsWith("refreshToken="),
    );
    if (refreshCookie) {
      const tokenValue = refreshCookie.split(";")[0].split("=")[1];
      if (tokenValue) {
        cookieStore.set("refreshToken", tokenValue, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }
    }
  }
}

export async function loginAction(credentials: loginDTO) {
  try {
    const response = await authService.login(credentials);
    const { accessToken, user, tenant } = response.data.data;

    await syncSession(accessToken, tenant.id, response.headers["set-cookie"]);

    return {
      success: true,
      accessToken,
      user,
      tenant,
    };
  } catch (error: unknown) {
    return handleActionError(error, "Login failed");
  }
}

export async function verifyEmailAction(values: verifyEmailDTO) {
  try {
    const response = await authService.verifyEmail(values);
    const { accessToken, user, tenant } = response.data.data;

    await syncSession(accessToken, tenant.id, response.headers["set-cookie"]);

    return { success: true, accessToken, user, tenant };
  } catch (error: unknown) {
    return handleActionError(error, "Verification failed");
  }
}

export async function registerAction(credentials: RegisterDTO) {
  try {
    const response = await authService.register(credentials);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: unknown) {
    return handleActionError(error, "Registration failed");
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    await authService.logout()
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("activeTenantId");

    return { success: true };
  } catch (error) {
    return { success: false, message: "Logout failed" };
  }
}

export async function resendOtpAction(email: resendVerificationDTO) {
  try {
    const response = await authService.resendOtp(email);
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    return handleActionError(error, "Failed to resend OTP");
  }
}

export async function forgetPasswordAction(email: forgetPasswordDTO) {
  try {
    const response = await authService.forgetPassword(email);
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    return handleActionError(error, "Request failed");
  }
}

export async function resetPasswordAction(values: resetPasswordDTO) {
  try {
    const response = await authService.resetPassword(values);
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    return handleActionError(error, "Reset failed");
  }
}


function handleActionError(error: unknown, defaultMsg: string) {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      message: error.response?.data?.message || defaultMsg,
    };
  }
  return {
    success: false,
    message: "A server error occurred. Please try again later.",
  };
}
