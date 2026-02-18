import {Queue} from "bullmq"
import type { EmailJobDataDTO, IQueueService } from "@project/shared";
import { redis } from "../config/redis";

export class QueueService implements IQueueService {
  private emailQueue: Queue;

  constructor() {
    this.emailQueue = new Queue("email-queue", { connection: redis});
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

  

  
}