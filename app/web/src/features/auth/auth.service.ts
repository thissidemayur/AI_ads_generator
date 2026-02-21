import { api } from "@/lib/axios";
import type { forgetPasswordDTO, loginDTO, RegisterDTO, resendVerificationDTO, resetPasswordDTO, verifyEmailDTO } from "@project/shared/client";


export const authService = {
  // login
  async login(credentials: loginDTO) {

    return api.post(`/auth/login`, credentials);
  },

  async register(credentials: RegisterDTO) {
    return api.post(`/auth/register`, credentials);
  },

  async verifyEmail(values: verifyEmailDTO) {
    return api.post(`/auth/verify-email`, values);
  },

  async resendOtp(email: resendVerificationDTO) {
    return await api.post("/auth/resend-verify", email);
  },
  async forgetPassword(email: forgetPasswordDTO) {
    return api.post("/auth/forget-password", email);
  },
  async resetPassword(valus: resetPasswordDTO) {
    return api.post("/auth/forget-password", valus);
  },

  //
};