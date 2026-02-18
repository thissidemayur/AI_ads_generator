import type { PrismaClient } from "@prisma/client/extension";
import type { ISessionRepository } from "@project/shared";
import type { Sessions } from "@project/shared/server";

export class PrismaSessionRepository implements ISessionRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: {
    refreshToken: string;
    userId: string;
    expiresAt: Date;
  }): Promise<void> {
    await this.db.sessions.create({
      data: {
        userId: data.userId,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
      },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.db.sessions.deleteMany({ where: { userId } });
  }

  async deleteByToken(hashedToken: string): Promise<void> {
    await this.db.sessions.delete({ where: { refreshToken: hashedToken } });
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.db.sessions.deleteMany({
      where: { userId },
    });
  }

  async findByUserId(userId: string): Promise<Partial<Sessions>[]> {
    return await this.db.sessions.findMany({
      where: { userId },
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        createdAt: true,
        expiresAt: true,
      },
    });
  }

  async deleteBySessionId(sessionId: string): Promise<void> {
    await this.db.sessions.delete({ where: { id: sessionId } });
  }
}