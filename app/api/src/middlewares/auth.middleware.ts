import { ApiError, type ITokenServcice } from "@project/shared";
import { asyncHandler } from "@project/shared/server";
import type { NextFunction, Request, Response } from "express";
import type Redis from "ioredis";

export const authMiddleware = (tokenService: ITokenServcice, redis: Redis) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new ApiError(401, "Authentication required");
      }

      const tenantId = req.headers["x-tenant-id"] as string;
      if (!tenantId)
        throw new ApiError(400, "Workspace context (x-tenant-id) missing");

      const token = authHeader.split(" ")[1] as string;

      let decoded;
      try {
        decoded = tokenService.verifyAccessToken(token);
      } catch (error: any) {
        // Catch "jwt malformed", "jwt expired", etc.
        console.error("[JWT_VERIFY_ERROR]: ", error.message);
        throw new ApiError(401, "Invalid or expired session token");
      }
      // check "Blacklist" or "Version" in Redis
      const cachedVersion = await redis.get(
        `auth:user-version:${decoded.userId}`,
      );
      if (cachedVersion && parseInt(cachedVersion) > decoded.version) {
        throw new ApiError(
          401,
          "Session expired due to security changes. Please login again.",
        );
      }

      req.authUser = {
        userId: decoded.userId,
        tenantId: decoded.tenantId,
        role: decoded.role,
      };

      next();
    },
  );
};
