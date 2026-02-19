import type { Prisma,User } from "../generated/prisma"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;

  incrementVersion(userId: string): Promise<void>; // for the "Kill switch" to delete all session
  getCurrentVersion(userId: string): Promise<number>;

  updatePassword(userId: string, password: string): Promise<void>;
  createWithTx(
    tx: Prisma.TransactionClient,
    data: Prisma.UserCreateInput,
  ): Promise<User>;

  updateEmail(userId: string, email: string): Promise<void>;
  delete(userId: string): Promise<void>;
  update(userId: string, data: Partial<Prisma.UserUpdateInput>): Promise<User>;
  deleteWithTx(tx: Prisma.TransactionClient, userId: string): Promise<void>;
}
