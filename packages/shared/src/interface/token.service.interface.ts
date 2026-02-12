import type { Role } from "../generated/prisma";

export interface TokenPayloadDTO {
    userId: string
    tenantId:string;
    role:Role
    version:number
}

export interface ITokenServcice {
  generateAccessToken(payload: TokenPayloadDTO): string;
  generateRefreshToken(): string;
  verifyAccessToken(token: string): TokenPayloadDTO;
}