import { ApiError, type IMemberRepository, type IWorkspaceRepository, type IWorkspaceService } from "@project/shared";
import { Prisma, Role, type Member, type PrismaClient, type Tenant } from "@project/shared/server";

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
    const workspace = this.workspaceRepo.findById(id);
    if (!workspace) throw new ApiError(404, "Wokspace not found");

    return workspace;
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

  async deleteWorkspace(tenantId: string): Promise<void> {
    // This will trigger Prisma's onDelete: Cascade for Members and Ads
    await this.workspaceRepo.delete(tenantId);
  }
}