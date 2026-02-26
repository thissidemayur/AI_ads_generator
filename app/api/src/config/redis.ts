import Redis, { type RedisOptions } from "ioredis"
import { env } from "./env"


export const redisOptions: RedisOptions = {
    host:env.REDIS_HOST,
    port:env.REDIS_PORT,
    password:env.REDIS_PASSWORD,

    // Industry Standered: Exponential backoff for reconnection
    retryStrategy(times) {
        const delay = Math.min(times*50, 2000)
        return delay;
    },

    // Security: Prevent long-running commands from hanging for reconnection
    maxRetriesPerRequest:null,
    enableReadyCheck:true
}

export const redis =  new Redis(redisOptions)
// Every time a user opens an SSE stream, we might need a fresh subscription logic
export const createSubscriber = () => new Redis(redisOptions)
redis.on("error",(err)=>{
    console.error("❌ Redis Client Error\n", err);

})

redis.on("connect",()=>{
    console.log("🚀 Redis: Connected")
})


