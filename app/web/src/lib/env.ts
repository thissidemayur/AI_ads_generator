import {z} from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_INTERNAL_EXPRESS_URL: z.string(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_INTERNAL_EXPRESS_URL: process.env.INTERNAL_EXPRESS_URL,
  NODE_ENV: process.env.NODE_ENV,
});

console.log("_env: ",_env)
if (! _env.success) {
    const errorMsg = "❌ Invalid environment variables: "+ _env.error.message;
    console.log("errorMsg: ",errorMsg)
    throw new Error(errorMsg)
}

export const env = _env.data