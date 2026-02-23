import {z} from "zod"
import path from "path";
import dotenv from "dotenv"


dotenv.config({ path: `${process.cwd()}/.env` });
console.log("ENV DATABASE:", process.env.DATABASE_URL);

const envSchema = z.object({
  // Bun enviornment
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number(),

  // database
  DATABASE_URL: z.url(),

  // Redis
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),

  // Security(JWT)
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "Access secret must be at least 32 chars"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "Refresh secret must be at least 32 chars"),
  JWT_REFRESH_SECRET_EXPIRE: z.coerce.number().default(60 * 60 * 24 * 7),
  JWT_ACCESS_SECRET_EXPIRE: z.coerce.number().default(60 * 60 * 24 * 7),
  // Frontend URL
  FRONTEND_URL: z.url(),
  VERIFY_OTP_EXPIRES_TIME: z.coerce.number().default(900), // 15 min
});


// va;idate the env
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.message);
    process.exit(1); // stop the server
}

export const env = _env.data