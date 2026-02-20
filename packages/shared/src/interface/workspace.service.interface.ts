import type { Member, Prisma, Role, Tenant } from "../database";

export interface IWorkspaceService {
  getWorkspaceById(id: string): Promise<Tenant | null>;
  getUserWorkspaces(userId: string): Promise<Member[]>;
  getAllMembers(tenantId: string): Promise<Member[]>;
  addMember(tenantId: string, userId: string, role: Role): Promise<Member>;
  createWorkspace(userId: string, name: string): Promise<Tenant>;
  deleteWorkspace(tenantId: string, userId: string): Promise<void>;
  deleteAllOwnedWorkspaces(userId: string): Promise<void>;
  updateWorkspaceName(
    tenantId: string,
    userId: string,
    newName: string,
  ): Promise<Tenant>;
}
