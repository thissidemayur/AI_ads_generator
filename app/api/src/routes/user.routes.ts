import { Router, type RequestHandler } from "express";

import { validate } from "../middlewares/validate.middleware";

import { changePasswordSchema, confirmEmailChangeSchema, requestEmailChangeSchema, updateUserSchema } from "@project/shared/client";
import type { IUserController } from "@project/shared";

export const userRouter = (userController: IUserController, authenticate:RequestHandler) => {
  const router = Router();
  router.get("/me", authenticate, userController.getMe);
  router.patch(
    "/me",
    authenticate,
    validate(updateUserSchema),
    userController.updateMe,
  );

  // Security Management
  router.post(
    "/change-password",
    authenticate,
    validate(changePasswordSchema),
    userController.updatePassword,
  );
  router.post(
    "/terminate-sessions",
    authenticate,
    userController.terminateSessions,
  );

  // Email Change Flow
  router.post(
    "/request-email-change",
    authenticate,
    validate(requestEmailChangeSchema),
    userController.requestEmailChange,
  );
  router.post(
    "/confirm-email-change",
    authenticate,
    validate(confirmEmailChangeSchema),
    userController.emailChange,
  );

  // Account Destruction
  router.delete("/account", authenticate, userController.deleteAccount);
  4;

  return router;
};


