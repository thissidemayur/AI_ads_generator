import type { Prisma,User } from "../generated/prisma"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  
  incrementVersion(userId: string): Promise<void>; // for the "Kill switch" to delete all session
  getCurrentVersion(userId: string): Promise<number>;
}
