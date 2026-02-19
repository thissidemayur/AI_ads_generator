// DTO (Data Transfer Object) is an architectural pattern.

import type { Member, Role, Tenant } from "../generated/prisma";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name is too short").trim(),
  lastName: z.string().min(2, "First name is too short").trim(),
  workspaceName: z
    .string()
    .min(3, "Workspace name must be at least 3 characters")
    .trim()
    .default("ABC"),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const verifyEmailSchema = z.object({
  email: z.email().trim().toLowerCase(),
  otp: z.number().min(6, "OTP length must be 6 number long"),
});

export const revokeAllSessionSchema = z.object({
  userId: z.string().trim(),
});

export const forgetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().length(8, "Password must be at least 8 characters"),
});

export const resendVerificationSchema = z.object({
  email: z.string().trim().toLowerCase(),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type loginDTO = z.infer<typeof loginSchema>;
export type verifyEmailDTO = z.infer<typeof verifyEmailSchema>
export type resendVerificationDTO = z.infer<typeof resendVerificationSchema>
export type forgetPasswordDTO = z.infer<typeof forgetPasswordSchema>
export type resetPasswordDTO = z.infer<typeof resetPasswordSchema>;


export interface AuthResponseDTO {
  user: {
    id: string;
    email: string;
    firstName: string;
  };
  tenant: {
    id: string;
    name: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RequestContext {
  userId: string;
  tenantId: string; // come from Header (x-tentant-id header)
  role: Role;
}

export type MemberWithTenant = Member & {
  tenant: Tenant;
};

