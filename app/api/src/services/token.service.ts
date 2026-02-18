import type {   ITokenServcice,  TokenPayloadDTO } from "@project/shared";
import { env } from "../config/env";
import jwt from "jsonwebtoken"
import crypto from "crypto"


export class TokenService implements ITokenServcice{
  generateAccessToken(payload: TokenPayloadDTO): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET);
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(40).toString("hex");
  }

  verifyAccessToken(token: string): TokenPayloadDTO {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayloadDTO;
  }
}