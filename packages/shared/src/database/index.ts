import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";



const db_url = process.env.DATABASE_URL;
if (!db_url) {
  console.warn(
    "⚠️ DATABASE_URL not found in process.env. Ensure your root .env is loaded.",
  );
}

const adapter = new PrismaPg({ connectionString: db_url });

export const prismaConnection = new PrismaClient({adapter})
// Export everything from the generated client (Models, Enums, Types)
export * from "../generated/prisma";
