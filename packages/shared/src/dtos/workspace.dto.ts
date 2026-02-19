import { z } from "zod";
export const USER_ROLES = ["OWNER", "ADMIN", "EDITOR", "VIEWER"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(50, "Workspace name must be under 50 characters"),
});


export const addMemberSchema = z.object({
  targetUserId: z.string().uuid("Invalid User ID format (UUID required)"),
  role: z.enum(USER_ROLES,"Invalid Role selectd"),
});


export const workspaceHeaderSchema = z.object({
  "x-tenant-id": z.string().uuid("A valid Workspace ID is required in headers"),
});

export type CreateWorkspaceDTO = z.infer<typeof createWorkspaceSchema>;
export type AddMemberDTO = z.infer<typeof addMemberSchema>;
export type WorkspaceHeaderDTO = z.infer<typeof workspaceHeaderSchema>;
