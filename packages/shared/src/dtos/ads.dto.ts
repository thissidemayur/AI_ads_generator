import { z } from "zod";

export const AD_TYPE = {
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
} as const;
export type AdType = keyof typeof AD_TYPE;

export const MODEL_PROVIDER = {
  OPENAI: "OPENAI",
  GEMINI: "GEMINI",
} as const;
export type ModelProvider = keyof typeof MODEL_PROVIDER;

export const ASPECT_RATIO = {
  SQUARE: "1:1",
  LANDSCAPE: "16:9",
  PORTRAIT: "9:16",
} as const;
export type AspectRatio = (typeof ASPECT_RATIO)[keyof typeof ASPECT_RATIO];

export const Ad_Status = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type AdStatus = (typeof Ad_Status)[keyof typeof Ad_Status];

export const CreateAdSchema = z.object({
  prompt: z.string().min(10).max(500),
  adType: z.enum(AD_TYPE),
  aspectRatio: z.enum(ASPECT_RATIO).default(ASPECT_RATIO.SQUARE),
  modelProvider: z.enum(MODEL_PROVIDER).default(MODEL_PROVIDER.OPENAI),
});

export type CreateAdInput = z.infer<typeof CreateAdSchema>;

// payload sent from API to Worker(bullmq)
export interface AdJobPayload extends CreateAdInput {
  adId: string;
  tenantId: string;
  userId: string;
  tokenCost: number;
}


// real time update payload sent via SSE to the client
export interface AdProgressPayload {
  adId: string;
  status: AdStatus;
  progress: number;
  message?: string;
  resultUrl?: string;
}

export interface IAdUpdateDTO {
  status: AdStatus;
  contentUrl?: string;
  thumbnailUrl?: string;
  errorMessage?: string;
  externalJobId?: string;
}