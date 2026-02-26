import type {
  IAdController,
  ITokenServcice,
} from "@project/shared";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import type Redis from "ioredis";
import { authorize } from "../middlewares/authorize.middleware";
import { Role } from "@project/shared/server";

export const adsRouter = (
  controller: IAdController,
  toknService: ITokenServcice,
  redis: Redis,
) => {
  const router = Router();
  const auth = authMiddleware(toknService, redis);
  router.get("/", auth, controller.handleGetHistory);

  router.post(
    "/generate",
    auth,
    authorize([Role.ADMIN, Role.EDITOR, Role.OWNER]),
    controller.handleStartGeneration,
  );

  router.get("/status/:adId", controller.handleStreamStatus);

  router.post(
    "/:adId/retry",
    auth,
    authorize([Role.ADMIN, Role.EDITOR, Role.OWNER]),
    controller.handleRetry,
  );
  router.get("/:adId", auth, controller.handleGetDetails);
  router.get("/status/:adId");
  router.delete(
    "/:adId",
    auth,
    authorize([Role.ADMIN, Role.OWNER]),
    controller.handleDeleteAd,
  );

  return router;
};
