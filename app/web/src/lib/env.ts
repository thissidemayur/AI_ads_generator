import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_INTERNAL_EXPRESS_URL: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_INTERNAL_EXPRESS_URL: process.env.NEXT_INTERNAL_EXPRESS_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_env.success) {
  const errorMsg = " Invalid environment variables: " + _env.error.message;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

if (typeof window === "undefined" && !_env.data.NEXT_INTERNAL_EXPRESS_URL) {
  throw new Error(
    " NEXT_INTERNAL_EXPRESS_URL is required on the server-side",
  );
}

export const env = _env.data;
