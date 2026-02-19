import type { MemberWithTenant } from "../dtos/auth.dto";
import type { Member, Prisma, Role } from "../generated/prisma";


export interface IMemberRepository {
  findAllByUserId(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<MemberWithTenant[]>;
  //   getRoleInTenant(userId: string): Promise<Role | null>;
  findMember(userId: string, tenantId: string): Promise<Member | null>;

  create(userId: string, tenantId: string, role: Role): Promise<Member>;

  createWithTransaction(
    tx: Prisma.TransactionClient,
    userId: string,
    tenantId: string,
    role: Role,
  ): Promise<Member>;

  findByUser(userId: string): Promise<MemberWithTenant[]>;
  findByWorkspace(tenantId: string): Promise<Member[]>;
  countByWorkspace(tenantId: string): Promise<number>;
}