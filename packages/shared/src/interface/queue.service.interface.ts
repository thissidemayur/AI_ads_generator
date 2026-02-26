import type { AdJobPayload } from "../dtos/ads.dto";

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
  addAdJob(data: AdJobPayload): Promise<void>;

}
