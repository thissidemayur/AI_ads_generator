// packages/shared/src/interfaces/queue.service.interface.ts

export type EmailJobType = "VERIFY_EMAIL" | "PASSWORD_RESET" | "WELCOME_EMAIL";

export interface EmailJobDataDTO {
  to: string;
  type: EmailJobType;
  name?: string;
  payload: {
    otp?: number;
    link?: string;
  };
}

export interface IQueueService {

  addEmailJob(data: EmailJobDataDTO): Promise<void>;


  addAIJob?(tenantId: string, prompt: string): Promise<void>;
}
