import type { AdType } from "../database"

export interface IAIService {
  refinePrompt(
    userInput: string,
    aspectRatio: string,
    format: AdType,
  ): Promise<string>;

  generateAd(
    refinePrompt: string,
    type: AdType,
    aspectRatio: string,
  ): Promise<Buffer>;
}