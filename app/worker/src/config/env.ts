import z from "zod";
import dotenv from "dotenv"

dotenv.config({ path: `${process.cwd()}/.env` });

console.log("DB: ", process.env.FROM_EMAIL);


const envSchema = z.object({
  // Redis
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),

  RESEND_API_KEY: z.string(),
  FROM_EMAIL: z.string(),
});

const _env = envSchema.safeParse(process.env)
if(!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.message);
    process.exit(1);
}

export const env = _env.data