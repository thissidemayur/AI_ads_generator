import { ApiError, type IUserRepository } from "@project/shared";
import type { Prisma, PrismaClient, User } from "@project/shared/server";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly db: PrismaClient) {} // {} means we initalise db as db that is this.db = db . when we use private or public constructor automatically initalise

  async findByEmail(email: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.db.user.create({ data });
  }

  async getCurrentVersion(userId: string): Promise<number> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { tokenVersion: true },
    }); //// Industry Standard: Select only what you need

    if (!user) throw new ApiError(404, "User not found");
    return user.tokenVersion;
  }

  async incrementVersion(userId: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: {
        tokenVersion: { increment: 1 },
      },
    });
  }

  async updatePassword(userId: string, passwordHash: string): Promise<void> {
    await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: passwordHash,
      },
    });
  }

  async createWithTx(
    tx: Prisma.TransactionClient,
    data: Prisma.UserCreateInput,
  ) {
    return await tx.user.create({ data });
  }

  async delete(userId: string): Promise<void> {
    await this.db.user.delete({ where: { id: userId } });
  }

  async updateEmail(userId: string, email: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { email, isVerified: true },
    });
  }

  async update(
    userId: string,
    data: Partial<Prisma.UserUpdateInput>,
  ): Promise<User> {
    return await this.db.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteWithTx(
    tx: Prisma.TransactionClient,
    userId: string,
  ): Promise<void> {
    await tx.user.delete({
      where: { id: userId },
    });
  }
}