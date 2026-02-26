import { AdStatus ,type Ad } from "@project/shared/server";
import { type AdJobPayload, type CreateAdInput } from "@project/shared/client";
import type { IAdRepository, IAdService, INotifierService, IQueueService } from "@project/shared";


export class AdService implements IAdService {
  constructor(
    private readonly adRepo: IAdRepository,
    private readonly queueService: IQueueService,
    private readonly notifier: INotifierService,
  ) {}
  async createAdGeneratorTask(
    userId: string,
    tenantId: string,
    input: CreateAdInput,
  ): Promise<Ad> {
    // find cost
    const cost = input.adType === "VIDEO" ? 50 : 10;

    const adInput = {
      userId,
      prompt: input.prompt,
      type: input.adType,
      status: AdStatus.PENDING,
      config: {
        aspectRatio: input.aspectRatio,
        provider: input.modelProvider,
      },
    };
    const ad = await this.adRepo.createWithTx(tenantId, cost, adInput);
    try {
      // send task to queue
      const payload: AdJobPayload = {
        ...input,
        adId: ad.id,
        tenantId,
        userId,
        tokenCost: cost,
      };

      await this.queueService.addAdJob(payload);

      // SSE
      // we publish a message so that user's browser immediatley know its queued
      await this.notifier.publishProgress(ad.id, {
        status: "PROCESSING",
        progress: 10,
        message: "Job queued and awaiting worker...",
      });
    } catch (error) {
      // refund logic triggered if queue is down
      await this.adRepo.updateStatus(ad.id, "FAILED", {
        errorMessage: "Queue failure. Tokens have been refunded.",
      });

      // manually increment
      await this.adRepo.refundTokens(tenantId, ad.id, cost);
    }
    return ad;
  }

  async getAdHistory(
    tenantId: string,
    limit: number,
    offset: number,
  ): Promise<Ad[]> {
    return this.adRepo.findByTenant(tenantId, limit, offset);
  }

  async getAdDetails(adId: string, tenantId: string): Promise<Ad | null> {
    return this.adRepo.findById(adId, tenantId);
  }

  async retryGeneration(adId: string, tenantId: string): Promise<Ad> {
    const ad = await this.adRepo.findById(adId, tenantId);
    if (!ad) throw new Error("AD_NOT_FOUND");
    if (ad.status !== "FAILED")
      throw new Error("ONLY_FAILED_JOBS_CAN_BE_RETRIED");
    const updatedAd = await this.adRepo.updateStatus(adId, "PENDING", {});

    // reque the payload(reconstruct payload from DB)
    // tokenCost is 0 beacuse the "debt" was already settled
    const payload: AdJobPayload = {
      adId: ad.id,
      tenantId: ad.tenantId,
      userId: ad.userId,
      prompt: ad.refinedPrompt || ad.prompt,
      adType: ad.type,
      aspectRatio: (ad.config as any)?.aspectRatio || "1:1",
      modelProvider: (ad.config as any)?.provider || "OPENAI",
      tokenCost: 0,
    };
    await this.queueService.addAdJob(payload);

    // Notify SSE (progress 0%)
    await this.notifier.publishProgress(adId,{
      status:"PROCESSING",
      progress:0,
      message: "Retrying generation...",
    })

    return updatedAd;
  }

  async deleteAd(adId: string, tenantId: string): Promise<void> {
    const ad = await this.adRepo.findById(adId, tenantId);
    if (!ad) throw new Error("AD_NOT_FOUND");

    if (ad.status === "PROCESSING") {
      throw new Error("CANNOT_DELETE_ACTIVE_JOB");
    }

    // remove from DB
    await this.adRepo.delete(adId, tenantId);

    // clean from S3/cloudinary (beacuse S3 is slow inside api/)
    // instead we push a "cleanup" job to the queue
    if (ad.contentUrl) {
      await this.queueService.addCleanupJob({ url: ad.contentUrl });
    }
  }
}