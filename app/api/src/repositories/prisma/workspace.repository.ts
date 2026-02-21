import type { IWorkspaceRepository } from "@project/shared";
import {
  Prisma,
  Role,
  type PrismaClient,
  type Sessions,
  type Tenant,
} from "@project/shared/server";

export class PrismaWorkspaceRepository implements IWorkspaceRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(name: string): Promise<Tenant> {
    return this.db.tenant.create({ data: { name } });
  }

  // Pure function: Just creates the tenant. The Service will handle the member link.
  async createWithTransaction(
    tx: Prisma.TransactionClient,
    name: string,
  ): Promise<Tenant> {
    return await tx.tenant.create({ data: { name } });
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.db.tenant.findUnique({ where: { id } });
  }

  async countByWorkspace(tenantId: string): Promise<number> {
    return await this.db.member.count({ where: { tenantId } });
  }

  async delete(tenantId: string): Promise<void> {
    await this.db.tenant.delete({ where: { id: tenantId } });
  }

  async deleteWithTx(
    tx: Prisma.TransactionClient,
    tenantId: string,
  ): Promise<void> {
    await tx.tenant.delete({
      where: { id: tenantId },
    });
  }

  async findAllMembers(tenantId: string) {
    return this.db.member.findMany({
      where: { tenantId },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
  }

  async findOwnedTenants(userId: string): Promise<string[]> {
    const memberships = await this.db.member.findMany({
      where: { userId, role: "OWNER" },
      select: { tenantId: true },
    });
    return memberships.map((m) => m.tenantId);
  }

  async update(id: string, data: Partial<Tenant>): Promise<Tenant> {
    return await this.db.tenant.update({
      where: { id },
      data,
    });
  }

  async findMember(tenantId: string, userId: string) {
    return await this.db.member.findUnique({
      where: {
        userId_tenantId: { userId, tenantId },
      },
    });
  }
}
