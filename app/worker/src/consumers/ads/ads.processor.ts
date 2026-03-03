import { AD_TYPE, type AdJobPayload } from "@project/shared/client";

import type { Job } from "bullmq";

import { dependencies } from "../../container";

export const adProcessor = async (job: Job<AdJobPayload>) => {
  const { adId, tenantId, tokenCost, prompt, adType, aspectRatio } = job.data;

  const { adRepo, notifier, storage, aiService } = dependencies;

  try {
    const ad = await adRepo.findById(adId, tenantId);
    
    // check if job is already done(idempotency problem)
    // this resolve the "double work" problem is the worker restarted
    if (ad?.status === "COMPLETED") {
      console.log(`[Job_Already_Completed]. adId: ${adId}. skipping`);

      return { skipped: true };
    }

    let finalPrompt = ad?.refinedPrompt;

    if (!finalPrompt) {
      await notifier.publishProgress(adId, {
        status: "PROCESSING",

        progress: 15,

        message: "Refining prompt for best results...",
      });

      finalPrompt = await aiService.refinePrompt(prompt, aspectRatio,adType);

      await adRepo.updateStatus(adId, "PROCESSING", {
        refinedPrompt: finalPrompt,
      });
    }

    await notifier.publishProgress(adId, {
      status: "PROCESSING",
      progress: 40,
      message: "Generating high-quality creative assets...",
    });

    const imageBuffer = await aiService.generateAd(finalPrompt,adType,aspectRatio)
    

    await notifier.publishProgress(adId, {
      status: "PROCESSING",

      progress: 70,

      message: "Optimizing for delivery...",
    });

    const folder = adType === "VIDEO" ? "videos" : "images";

    const secureUrl = await storage.upload(imageBuffer,folder)
 
    await adRepo.updateStatus(adId, "COMPLETED", { contentUrl: secureUrl,refinedPrompt:finalPrompt,metadata:{
      
    } });

    await notifier.publishProgress(adId, {
      status: "COMPLETED",
      progress: 100,
      message: "Your ad is ready!",
      resultUrl: secureUrl,
    });

    return { success: true, url: secureUrl };

  } catch (error: any) {
    console.error(`[ADS_PROCESSOR_ERROR]: ${error.message}`);
if (error?.message.includes("content safety policy")) {
  await adRepo.updateStatus(adId, "FAILED", {
    error: "Policy Violation: Your prompt was flagged as unsafe.",
  });

  // notify the user
  await notifier.publishProgress(adId,{
    status:"FAILED",
    progress:0,
    message:"Blocked: This prompt violates our safety guidelines.",
  })
}
  // Check if BullMQ is done retrying

  const isLastAttempt = job.attemptsMade >= (job.opts.attempts || 1);

    if (isLastAttempt) {
      await adRepo.updateStatus(adId, "FAILED", {
        error: error?.message || "Unknown AI Generation Error",
      });

      if (tokenCost > 0) {
        await adRepo.refundTokens(tenantId, adId, tokenCost);
      }

      await notifier.publishProgress(adId, {
        status: "FAILED",

        progress: 0,

        message: "Generation failed. Tokens have been refunded.",
      });
    }
    // always throw error so that bull mq knows the job failed and can retry if attempts are left
    throw error;
  }
};
