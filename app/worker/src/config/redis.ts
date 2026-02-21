import type { RedisOptions } from "ioredis";
import { env } from "./env";

export const redisConnection: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, //critical for bullmq
  // for reliablity
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
};
