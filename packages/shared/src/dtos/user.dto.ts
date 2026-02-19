import { z } from "zod";


export const requestEmailChangeSchema = z.object({
  newEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address format"),
});


export const confirmEmailChangeSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must only contain numbers"),
});


export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
});


export const updateUserSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long")
      .optional(),
  })
  .refine(
    (data) => data.firstName !== undefined || data.lastName !== undefined,
    {
      message: "At least one field (firstName or lastName) must be provided",
    },
  );


export type RequestEmailChangeDTO = z.infer<typeof requestEmailChangeSchema>;
export type ConfirmEmailChangeDTO = z.infer<typeof confirmEmailChangeSchema>;
export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
