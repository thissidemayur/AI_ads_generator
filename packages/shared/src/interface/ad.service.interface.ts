import type { Ad } from "../database";
import type { CreateAdInput } from "../dtos/ads.dto";

export interface IAdService {
  createAdGeneratorTask(
    userId: string,
    tenantId: string,
    input: CreateAdInput,
  ): Promise<Ad>;

  //   handle the logic for re-runnin a failed job without double charging
  retryGeneration(adId: string, tenantId: string): Promise<Ad>;

  deleteAd(adId: string, tenantId: string): Promise<void>;
  getAdHistory(tenantId: string, limit: number, offset: number): Promise<Ad[]>;
  getAdDetails(adId: string, tenantId: string): Promise<Ad | null>;
}




// also we should move to Auto-Refund the pro move

// for that 

// also discuss about addCleanupJob of queue worker


