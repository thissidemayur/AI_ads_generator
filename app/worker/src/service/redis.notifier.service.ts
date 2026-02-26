import type { INotifierService } from "@project/shared";
import type { AdStatus } from "@project/shared/server";
import type Redis from "ioredis";

export class RedisNotifierService implements INotifierService {
  constructor(private readonly redis: Redis) {}

  async publishProgress(
    adId: string,
    payload: {
      status: AdStatus;
      progress: number;
      message: string;
      resultUrl?: string;
    },
  ): Promise<void> {
    const channel = `ad-progress:${adId}`;
    await this.redis.publish(channel, JSON.stringify({ adId, ...payload }));
  }
}
