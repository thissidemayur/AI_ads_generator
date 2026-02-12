// packages/shared/src/interfaces/queue.service.interface.ts

export type EmailJobType = "VERIFY_EMAIL" | "PASSWORD_RESET" | "WELCOME";

export interface EmailJobDataDTO {
  to: string;
  type: EmailJobType;
  payload: {
    otp?: number;
    name?: string;
    link?: string;
  };
}

export interface IQueueService {
  /**
   * Industry Standard: The producer (API) only cares about adding the job.
   */
  addEmailJob(data: EmailJobDataDTO): Promise<void>;

  /**
   * Future-proofing: For AI tasks (BullMQ handles multiple queues)
   */
  addAIJob?(tenantId: string, prompt: string): Promise<void>;
}
