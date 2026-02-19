// apps/api/src/routes/workspace.routes.ts
import { Router, type RequestHandler } from "express";
import type { IWorkspaceControllerInterface } from "@project/shared";
// import { createWorkspaceSchema, addMemberSchema } from "@project/shared/client";
// import { validate } from "../middlewares/validate.middleware";

export const workspaceRouter = (
  controller: IWorkspaceControllerInterface,
  authenticate: RequestHandler,
) => {
  const router = Router();

  router.use(authenticate);

  router.post("/", controller.create);
  router.get("/my", controller.getMyWorkspace); // List of all workspaces user belongs to
  router.get("/current", controller.getWorkspaceById); // Details of x-tenant-id

  router.get("/members", controller.getMembers);
  router.post(
    "/members",
    controller.addMemberToWorkspace,
  );

  router.delete("/current", controller.deleteCurrentWorkspace);

  router.delete("/purge-all", controller.purgeAllWorkspaces);

  return router;
};
