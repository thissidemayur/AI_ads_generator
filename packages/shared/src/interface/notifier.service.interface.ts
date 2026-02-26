import type { AdStatus } from "../database"

export interface INotifierService {
  publishProgress(
    adId: string,
    payload: {
      status: AdStatus;
      progress: number;
      message: string;
      resultUrl?: string;
    },
  ): Promise<void>;
}

