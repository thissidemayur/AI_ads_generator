import type { Member, Prisma, Role, Sessions, Tenant } from "../database";

export interface IWorkspaceRepository {
  create(name: string): Promise<Tenant>;
  findById(id: string): Promise<Tenant | null>;
  createWithTransaction(
    tx: Prisma.TransactionClient,
    name: string,
  ): Promise<Tenant>;
  countByWorkspace(tenantId: string): Promise<number>;
  delete(tenantId: string): Promise<void>;
  deleteWithTx(tx: Prisma.TransactionClient, tenantId: string): Promise<void>;
  findAllMembers(tenantId: string): Promise<Partial<Member[]>>;
  findOwnedTenants(userId: string): Promise<string[]>;
  update(id: string, data: Partial<Tenant>): Promise<Tenant>;
  findMember(tenantId: string, userId: string): Promise<Member | null>;
  findById(id: string): Promise<Tenant | null>;
}