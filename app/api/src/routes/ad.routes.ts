import type {
  IAdController,
} from "@project/shared";
import { Router, type RequestHandler } from "express";
import { authorize } from "../middlewares/authorize.middleware";
import { Role } from "@project/shared/server";

export const adsRouter = (controller: IAdController, authenticate:RequestHandler) => {
  const router = Router();
  const auth = authenticate
  router.get("/", auth, controller.handleGetHistory);

  router.post(
    "/generate",
    auth,
    authorize([Role.ADMIN, Role.EDITOR, Role.OWNER]),
    controller.handleStartGeneration,
  );


  router.post(
    "/:adId/retry",
    auth,
    authorize([Role.ADMIN, Role.EDITOR, Role.OWNER]),
    controller.handleRetry,
  );
  router.get("/:adId", auth, controller.handleGetDetails);
  router.get("/status/:adId",controller.handleStreamStatus);
  router.delete(
    "/:adId",
    auth,
    authorize([Role.ADMIN, Role.OWNER]),
    controller.handleDeleteAd,
  );

  return router;
};
