import {z} from "zod"
import dotenv from "dotenv"


dotenv.config({ path: `${process.cwd()}/.env` });

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
  JWT_REFRESH_SECRET_EXPIRE: z.string(),
  JWT_ACCESS_SECRET_EXPIRE: z.string(),
  // Frontend URL
  FRONTEND_URL: z.url(),
  VERIFY_OTP_EXPIRES_TIME: z.coerce.number().default(900), // 15 min

  // CLOUDINARY
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_URL: z.string().optional(),

  // google 
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.url(),
});


// validate the env
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.message);
    process.exit(1); 
}

export const env = _env.data
