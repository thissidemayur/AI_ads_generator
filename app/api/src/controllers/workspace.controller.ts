// apps/api/src/controllers/workspace.controller.ts
import {
  ApiError,
  ApiResponse,
  type IWorkspaceControllerInterface,
} from "@project/shared";
import { asyncHandler } from "@project/shared/server";
import type { Request, Response } from "express";
import type { WorkspaceService } from "../services/workspace.service";

export class WorkspaceController implements IWorkspaceControllerInterface {
  constructor(private readonly workspaceService: WorkspaceService) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.authUser.userId; // From authenticate middleware
    const workspace = await this.workspaceService.createWorkspace(userId, name);

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          `Workspace "${name}" created successfully`,
          workspace,
        ),
      );
  });

  getMyWorkspace = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const workspaces = await this.workspaceService.getUserWorkspaces(userId);

    if (!workspaces || workspaces.length === 0) {
      throw new ApiError(404, "No workspaces found. Please create one.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "Workspaces retrieved successfully", workspaces),
      );
  });

  getWorkspaceById = asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.authUser.tenantId;

    const workspace = await this.workspaceService.getWorkspaceById(tenantId);
    if (!workspace) {
      throw new ApiError(404, "Workspace not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Workspace fetched successfully", workspace));
  });

  addMemberToWorkspace = asyncHandler(async (req: Request, res: Response) => {
    const { targetUserId, role } = req.body;
    const tenantId = req.authUser.tenantId;

    const member = await this.workspaceService.addMember(
      tenantId,
      targetUserId,
      role,
    );

    res
      .status(201)
      .json(new ApiResponse(201, "Member added successfully", member));
  });


  getMembers = asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.authUser.tenantId;
    const members = await this.workspaceService.getAllMembers(tenantId);
    res.status(200).json(new ApiResponse(200, "Members retrieved", members));
  });

  deleteCurrentWorkspace = asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.authUser.tenantId;
    const userId = req.authUser.userId;

    await this.workspaceService.deleteWorkspace(tenantId, userId);
    res
      .status(200)
      .json(new ApiResponse(200, "Workspace and all associated data purged"));
  });

  purgeAllWorkspaces = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    await this.workspaceService.deleteAllOwnedWorkspaces(userId);
    res
      .status(200)
      .json(new ApiResponse(200, "All owned workspaces have been deleted"));
  });
}
