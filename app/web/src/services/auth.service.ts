import { api } from "@/lib/axios";
import type { forgetPasswordDTO, loginDTO, RegisterDTO, resendVerificationDTO, resetPasswordDTO, verifyEmailDTO } from "@project/shared/client";


export const authService = {
  // login
   login(credentials: loginDTO) {

    return api.post(`/auth/login`, credentials);
  },

   register(credentials: RegisterDTO) {
    return api.post(`/auth/register`, credentials);
  },

   verifyEmail(values: verifyEmailDTO) {
    return api.post(`/auth/verify-email`, values);
  },

   async resendOtp(email: resendVerificationDTO) {
    return await api.post("/auth/resend-verify", email);
  },
   forgetPassword(email: forgetPasswordDTO) {
    return api.post("/auth/forget-password", email);
  },
   resetPassword(valus: resetPasswordDTO) {
    return api.post("/auth/forget-password", valus);
  },
  logout( ) {
    return api.post("/auth/logout")
  }

  
};