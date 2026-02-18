// import {  forgetPasswordSchema, loginSchema, registerSchema, resendVerificationSchema, resetPasswordSchema, verifyEmailSchema, type IAuthController } from "@project/shared";
// import { Router } from "express";
// import { validate } from "../middlewares/validate.middleware";

import type { IAuthController, ITokenServcice } from "@project/shared";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import type Redis from "ioredis";
import { authorize } from "../middlewares/authorize.middleware";
import { Role } from "@project/shared/server";


export const adsRouter = (controller: IAuthController,toknService:ITokenServcice,redis:Redis) =>{
    const router = Router()

    router.get("/",authMiddleware(toknService,redis))

    router.post("/",authMiddleware(toknService,redis), authorize([Role.ADMIN,Role.EDITOR,Role.OWNER]))

    router.delete(
      "/",
      authMiddleware(toknService, redis),
      authorize([Role.ADMIN, Role.OWNER]),
    );
}