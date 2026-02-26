import type { AdType } from "../database"

export interface IAIService {
  refinePrompt(userInput: string, aspectRatio: string): Promise<string>;

  generateAd(refinePrompt: string, type: AdType): Promise<Buffer>;
}