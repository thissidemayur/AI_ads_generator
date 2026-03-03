// apps/api/src/routes/workspace.routes.ts
import { Router, type RequestHandler } from "express";
import type { IWorkspaceControllerInterface } from "@project/shared";
import { authorize } from "../middlewares/authorize.middleware";
import { Role } from "@project/shared/server";
import { validate } from "../middlewares/validate.middleware";
import { addMemberSchema, createWorkspaceSchema } from "@project/shared/client";

export const workspaceRouter = (
  controller: IWorkspaceControllerInterface,
  authenticate: RequestHandler,
) => {
  const router = Router();

  router.use(authenticate);

  router.post(
    "/",
    authorize([Role.ADMIN]),
    validate(createWorkspaceSchema),
    controller.create,
  );
  router.get("/my", controller.getMyWorkspace); // List of all workspaces user belongs to
  router.get("/current", controller.getWorkspaceById); // Details of x-tenant-id

  router.get("/members",authorize([Role.ADMIN,Role.OWNER]), controller.getMembers);
  router.post(
    "/members",
    authorize([Role.ADMIN, Role.OWNER]),
    validate(addMemberSchema),
    controller.addMemberToWorkspace,
  );

  router.delete("/current",authorize([Role.ADMIN]), controller.deleteCurrentWorkspace);

  router.delete("/purge-all",authorize([Role.ADMIN]) ,controller.purgeAllWorkspaces);
router.patch("/current",controller.update)
  return router;
};
