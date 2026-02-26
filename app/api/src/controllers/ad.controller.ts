import type { Request, Response } from "express";
import {
  ApiError,
  ApiResponse,
  type IAdController,
  type IAdService,
  type ISSEManager,
} from "@project/shared";
import { asyncHandler } from "@project/shared/server";
import { Ad_Status } from "@project/shared/client";


export class AdController implements IAdController {
  constructor(
    private readonly adService: IAdService,
    private readonly sseManager:ISSEManager
  ) {}

  handleStartGeneration = asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const userId = req.authUser.id;

    try {
      const ad = await this.adService.createAdGeneratorTask(
        userId,
        tenantId,
        req.body,
      );
      return res
        .status(202)
        .json(new ApiResponse(202, "Generation task accepted", ad));
    } catch (error: any) {
      console.error(`[AdController] Generation failed: ${error?.message}`);
      // if queue fails, we should technically ROLLBACK the ad status failed
      throw new ApiError(
        error?.message === "INSUFFICIENT_TOKENS" ? 402 : 400,
        error.message || "An unexpected error occurred",
      );
    }
  });

  handleDeleteAd = asyncHandler(async (req: Request, res: Response) => {
    const { adId } = req.params;
    const tenantId = req.headers["x-tenant-id"] as string;
    const userRole = req.authUser.role;

    if (userRole !== "OWNER" || userRole !== "ADMIN") {
      throw new ApiError(403, "Only admin or owner can delete ads");
    }

    await this.adService.deleteAd(adId as string, tenantId);
  });

  handleGetHistory = asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const history = await this.adService.getAdHistory(tenantId, limit, offset);
    return res
      .status(200)
      .json(new ApiResponse(200, "history reterived successfully", history));
  });

  handleGetDetails = asyncHandler(async (req: Request, res: Response) => {
    const { adId } = req.params;
    const tenantId = req.headers["x-tenant-id"] as string;
    const ad = await this.adService.getAdDetails(adId as string, tenantId);
    if (!ad) throw new ApiError(404, "Ad not found");
    return res
      .status(200)
      .json(new ApiResponse(200, "Get ad Successfully", ad));
  });

  handleRetry = asyncHandler(async (req: Request, res: Response) => {
    const { adId } = req.params;
    const tenantId = req.headers["x-tenant-id"] as string;
    const ad = await this.adService.retryGeneration(adId as string, tenantId);
    return res.status(202).json(new ApiResponse(202, "Retry started", ad));
  });

  handleStreamStatus =  asyncHandler(async(req:Request,res:Response)=>{
    const {adId} = req.params

    // SSE headers
    res.setHeader("Content-Type","text/event-stream")
    res.setHeader("Cache-Control","no-cache")
    res.setHeader("Connection","keep-alive")

    // Join the internal event stream
    const leaveStream = this.sseManager.joinStream(adId as string,(message)=>{
      res.write(`data:${message}\n\n`)

      const parsed = JSON.parse(message)
      if(parsed.status === Ad_Status.COMPLETED || parsed.status === Ad_Status.FAILED){
        res.end()
      }
    })

    // handle disconnection(user close tab)
    req.on("close",()=>{

      leaveStream() //stop the internal listener
      res.end()
    })
  })
  
}
