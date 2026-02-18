import type { IMemberRepository, MemberWithTenant } from "@project/shared";
import type { Member, Prisma, PrismaClient, Role, Tenant } from "@project/shared/server";

export class PrismaMemberRepository implements IMemberRepository {
  constructor(private readonly db: PrismaClient) {}

  /**
   * Finds all workspaces for a user.
   * We include the tenant details because the UI needs the Name and Balance immediately.
   */
  async findAllByUserId(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<(Member & { tenant: Tenant })[]> {
    const client = tx || this.db;
    return await client.member.findMany({
      where: { userId },
      include: { tenant: true }, //return name and balance
      orderBy: { createdAt: "asc" }, // default to first workspace created
    });
  }

  /**
   * Finds all workspaces for a user.
   * We include the tenant details because the UI needs the Name and Balance immediately.
   */
  async findMember(userId: string, tenantId: string): Promise<Member | null> {
    return await this.db.member.findUnique({
      where: {
        userId_tenantId: {
          userId,
          tenantId,
        },
      },
    });
  }

  async create(userId: string, tenantId: string, role: Role): Promise<Member> {
    return this.db.member.create({ data: { userId, role, tenantId } });
  }

  async createWithTransaction(
    tx: Prisma.TransactionClient,
    userId: string,
    tenantId: string,
    role: Role,
  ): Promise<Member> {
    return tx.member.create({ data: { userId, tenantId, role } });
  }

  async findByUser(userId: string): Promise<MemberWithTenant[]> {
    const members = await this.db.member.findMany({
      where: { userId },
      include: { tenant: true },
    });

    // We cast it here to satisfy the joined type requirement
    return members as MemberWithTenant[];
  }

  async findByWorkspace(tenantId: string): Promise<Member[]> {
    return this.db.member.findMany({
      where: { tenantId },
      include: { user: true },
    });
  }

  async countByWorkspace(
    tenantId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const client = tx || this.db; // Use transaction client if available
    return await client.member.count({
      where: { tenantId },
    });
  }
}