import {
  ApiError,
  type IMemberRepository,
  type IWorkspaceRepository,
  type IWorkspaceService,
} from "@project/shared";
import {
  Role,
  type PrismaClient,
  type Member,
  type Tenant,
} from "@project/shared/server";

export class WorkspaceService implements IWorkspaceService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly workspaceRepo: IWorkspaceRepository,
    private readonly memberRepo: IMemberRepository,
  ) {}

  async createWorkspace(userId: string, name: string): Promise<Tenant> {
    return await this.prisma.$transaction(async (tx) => {
      const tenant = await this.workspaceRepo.createWithTransaction(tx, name);
      await this.memberRepo.createWithTransaction(
        tx,
        userId,
        tenant.id,
        Role.OWNER,
      );
      return tenant;
    });
  }

  async getWorkspaceById(id: string): Promise<Tenant | null> {
    const workspace = await this.workspaceRepo.findById(id);
    if (!workspace) throw new ApiError(404, "Workspace not found");
    return workspace;
  }

  async getAllMembers(tenantId: string): Promise<Member[]> {
    return await this.memberRepo.findByWorkspace(tenantId);
  }

  async deleteWorkspace(tenantId: string, userId: string): Promise<void> {
    const membership = await this.memberRepo.findMember(userId, tenantId);

    if (!membership || membership.role !== Role.OWNER) {
      throw new ApiError(
        403,
        "Only the Workspace Owner can perform this action",
      );
    }

   await this.workspaceRepo.delete(tenantId);
  }

  async deleteAllOwnedWorkspaces(userId: string): Promise<void> {
    const userMemberships = await this.memberRepo.findByUser(userId);

    const ownedTenantIds = userMemberships
      .filter((m) => m.role === Role.OWNER)
      .map((m) => m.tenantId);

    if (ownedTenantIds.length === 0) return;

    await this.prisma.$transaction(async (tx) => {
      for (const tenantId of ownedTenantIds) {
        await this.workspaceRepo.deleteWithTx(tx, tenantId);
      }
    });
  }

  async getUserWorkspaces(userId: string): Promise<Member[]> {
    return this.memberRepo.findByUser(userId);
  }

  async addMember(
    tenantId: string,
    userId: string,
    role: Role,
  ): Promise<Member> {
    return this.memberRepo.create(userId, tenantId, role);
  }
}
