import {  forgetPasswordSchema, loginSchema, registerSchema, resendVerificationSchema, resetPasswordSchema, verifyEmailSchema, type IAuthController } from "@project/shared";
import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";

export const authRouter = (controller: IAuthController) => {
  const router = Router();

  router.post("/register",validate(registerSchema), controller.register);
  router.post("/login",validate(loginSchema), controller.login);
  router.post("/verify-email",validate(verifyEmailSchema), controller.verifyEmail);
  router.post("/resend-verify",validate(resendVerificationSchema), controller.resendVerification);
  router.post("/refresh",controller.refresh);
  router.post("/logout", controller.logout);
  router.post("/forget-password",validate(forgetPasswordSchema), controller.forgetPassword);
  router.post("/reset-password", validate(resetPasswordSchema),controller.resetPassword);

  return router;
};


