// apps/api/src/routes/workspace.routes.ts
import { Router, type RequestHandler } from "express";
import type { IWorkspaceControllerInterface } from "@project/shared";

export const workspaceRouter = (
  controller: IWorkspaceControllerInterface,
  authenticate:RequestHandler) => {
  const router = Router();

  // All workspace routes require a valid session
  router.use(authenticate);

  router.post("/", controller.create);
  router.get("/my", controller.getMyWorkspace);
  router.get("/current", controller.getWorkspaceById);
  router.post("/members", controller.addMemberToWorkspace);

  return router;
};


