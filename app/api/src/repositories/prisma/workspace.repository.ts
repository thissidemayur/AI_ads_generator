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
}