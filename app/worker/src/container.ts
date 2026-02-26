import { RedisNotifierService } from "./service/redis.notifier.service";
import { AdRepository } from "./repository/ads.repository";
import { CloudinaryStorageService } from "./service/cloudinary.storage.service";
import { redis } from "./config/redis";
import { prismaConnection } from "@project/shared/server";
import { AiService } from "./service/ai.service";

const notifier = new RedisNotifierService(redis)
const adRepo = new AdRepository(prismaConnection)
const cloudinaryStorage = new CloudinaryStorageService()

const aiService = new AiService()

export const dependencies = {
    notifier,
    adRepo,
    storage: cloudinaryStorage ,
    aiService,
}