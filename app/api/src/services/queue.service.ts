import {Queue} from "bullmq"
import type { EmailJobDataDTO, IQueueService } from "@project/shared";
import {redisOptions } from "../config/redis";
import type { AdJobPayload } from "@project/shared/client";


export class QueueService implements IQueueService {
  private emailQueue: Queue;
  private adQueue: Queue

  constructor() {
    this.emailQueue = new Queue("email-queue", { connection: redisOptions});
    this.adQueue = new Queue("ad-generation-queue", {
      connection: redisOptions,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
        removeOnComplete: true,
      },
    });
  }

  async addEmailJob(data: EmailJobDataDTO):Promise<void> {
    await this.emailQueue.add("send-email", data, {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 5000, //start with 5s wait
      },
      removeOnComplete: true,
      // removeOnFail: {
      //   age: 24 * 60 * 60,
      // },
    });
  }

  async addAdJob(data:AdJobPayload):Promise<void> {
    await this.adQueue.add(`ad-job-${data.adId}`,data,{
      attempts:3,
      backoff:{
        type:"exponential",
        delay:5000
      },
      removeOnComplete:true,
    })
  }


}