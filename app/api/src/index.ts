import { PrismaClient, prismaConnection } from "@project/shared/server";
import { env } from "./config/env";
import { redis } from "./config/redis";
import { createContainer } from "./container";
import { createApp } from "./app";


const startServer = async() =>{

try {

    const container = createContainer(prismaConnection,redis)
    const app = createApp(container)

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
    
} catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1)
}
}

startServer()