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

export async function loginAction(credentials: loginDTO) {
  // call express (server-to server)
  try {
    const response = await authService.login(credentials);
    const { accessToken, user, tenant } = response.data.data;

    // extract refreshToken from set-cookie header
    const setCookieHeader = response.headers["set-cookie"];
    const refreshCookie = setCookieHeader?.find((c) =>
      c.startsWith("refreshToken="),
    );

    const tokenValue = refreshCookie?.split(":")[0].split("=")[1];
    if (!tokenValue)
      throw new Error("Security: Refresh token missing from Chef");

    const cookieStore = await cookies();
    cookieStore.set("refreshToken", tokenValue, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      path: "/", // set all bcz middleware can it on dashboard
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    // return data to hook to update zustand
    return {
      success: true,
      accessToken,
      user,
      tenant,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    } else {
      return {
        success: false,
        message: "Login failed, due to server error",
      };
    }
  }
}

export async function registerAction(credentials: RegisterDTO) {
  try {
    const response = await authService.register(credentials);

    return {
      success: true,
      message: response.data.message, // "Registration successful. Please verify..."
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
  }
}

export async function verifyEmailAction(values: verifyEmailDTO) {
  try {
    const response = await authService.verifyEmail(values);
    const { accessToken, user, tenant } = response.data.data;

    // 🍪 Proxy the Refresh Token Cookie
    const setCookieHeader = response.headers["set-cookie"];
    const refreshCookie = setCookieHeader?.find((c) =>
      c.startsWith("refreshToken="),
    );

    if (refreshCookie) {
      const tokenValue = refreshCookie.split(";")[0].split("=")[1];
      const cookieStore = await cookies();
      cookieStore.set("refreshToken", tokenValue, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true, accessToken, user, tenant };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
  }
}

export async function resendOtpAction(email: resendVerificationDTO) {
  try {
    const response = await authService.resendOtp(email);
    return {
      success: true,
      message: response.data.message || "OTP sent successfully!",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
  }
}


// 1. Send Reset Link
export async function forgetPasswordAction(email: forgetPasswordDTO) {
  try {
    const response = await authService.forgetPassword(email)
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
  }
}

// 2. Set New Password
export async function resetPasswordAction(values: resetPasswordDTO) {
  try {
    const response = await authService.resetPassword(values);
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
  }
}