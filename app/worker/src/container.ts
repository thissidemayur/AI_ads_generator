import { RedisNotifierService } from "./service/redis.notifier.service";
import { AdRepository } from "./repository/ads.repository";
import { CloudinaryStorageService } from "./service/cloudinary.storage.service";
import { redis } from "./config/redis";
import { prismaConnection } from "@project/shared/server";
import { AiService } from "@project/shared";

const notifier = new RedisNotifierService(redis)
const adRepo = new AdRepository(prismaConnection)
const cloudinaryStorage = new CloudinaryStorageService()

let apiKey = process.env.GEMINI_API_KEY;
const aiService = new AiService(apiKey = apiKey!)

export const dependencies = {
    notifier,
    adRepo,
    storage: cloudinaryStorage ,
    aiService,
}