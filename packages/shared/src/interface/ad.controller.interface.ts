import type { RequestHandler } from "express";

export interface IAdController {
  handleStartGeneration: RequestHandler;
  handleStreamStatus: RequestHandler;
  handleGetHistory: RequestHandler;
  handleDeleteAd: RequestHandler;
  handleRetry: RequestHandler;
  handleGetDetails:RequestHandler
}