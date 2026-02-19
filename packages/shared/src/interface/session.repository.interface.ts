import type { Sessions } from "../database";


export interface ISessionRepository {
  create(data: {
    refreshToken: string;
    userId: string;
    expiresAt: Date;
  }): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
  deleteByToken(hashedToken: string): Promise<void>;
  deleteAllForUser(userId: string): Promise<void>;
  findByUserId(userId: string): Promise<Partial<Sessions>[]>;
  deleteBySessionId(sessionId: string): Promise<void>;
}

