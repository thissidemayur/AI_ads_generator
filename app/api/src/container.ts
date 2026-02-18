import type { PrismaClient } from "@project/shared/server";
import type Redis from "ioredis";
import { TokenService } from "./services/token.service";
import { QueueService } from "./services/queue.service";
import { PrismaUserRepository } from "./repositories/prisma/user.repository";
import { PrismaMemberRepository } from "./repositories/prisma/member.repository";
import { PrismaSessionRepository } from "./repositories/prisma/session.repository";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { WorkspaceService } from "./services/workspace.service";
import { PrismaWorkspaceRepository } from "./repositories/prisma/workspace.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { WorkspaceController } from "./controllers/workspace.controller";
import { authMiddleware } from "./middlewares/auth.middleware";

/**
 * Manual Composition Root
 */
export const createContainer = (db: PrismaClient, redis: Redis) => {
  // initalise low level service
  const tokenService = new TokenService();
  const queueServie = new QueueService();
const authenticate = authMiddleware(tokenService,redis)
  // initalize repositories
  const userRepo = new PrismaUserRepository(db);
  const memberRepo = new PrismaMemberRepository(db);
  const sessionRepo = new PrismaSessionRepository(db);
  const workspaceRepo = new PrismaWorkspaceRepository(db);

  const workspaceService = new WorkspaceService(db, workspaceRepo, memberRepo);

  // Initalise the service
  const authService = new AuthService(
    db,
    userRepo,
    queueServie,
    sessionRepo,
    redis,
    tokenService,
    memberRepo,
    workspaceService,
  );


  const userService = new UserService(
    db, // PrismaClient
    userRepo, // IUserRepository
    workspaceRepo, // IWorkspaceRepository
    redis, // Redis
    queueServie, // QueueService
    memberRepo, // IMemberRepository
    sessionRepo, // ISessionRepository
  );

  
  // initalize the controlleer
  
  const authController = new AuthController(authService);
  const userController = new UserController(userService);
  const workspaceController = new WorkspaceController(workspaceService)


  return {
    authController,
    userController,
    workspaceController,
    // service
    authService,
    workspaceService,
    userService,

    authenticate,
  };
};