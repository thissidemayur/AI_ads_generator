import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { IAIService } from "../interface/ai.interface";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AdType } from "../database";
import { GoogleGenAI, PersonGeneration } from "@google/genai";
import { ImageTemplate } from "../lib/prompt";

// using models
// image -> nanoBanana
// video -> vow
export class AiService implements IAIService {
  private model: ChatGoogleGenerativeAI;
  private genAi: GoogleGenAI;

  constructor(apiKey: string) {
    this.model = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: "gemini-2.5-flash",
      maxOutputTokens: 1000,
    });

    this.genAi = new GoogleGenAI({ apiKey });
  }

  async refinePrompt(
    userInput: string,
    aspectRatio: string,
    format: AdType,
  ): Promise<string> {
    let template:string="";
    if (format === "IMAGE") {
      template = ImageTemplate;
    } else if (format === "VIDEO") {
      throw new Error("Video template not yet implemented for MVP");
    } else {
      throw new Error(`Unsupported format: ${format}`);
    }

    const promptTemplate = PromptTemplate.fromTemplate(template);

    const chain = promptTemplate
      .pipe(this.model)
      .pipe(new StringOutputParser());

    const result = await chain.invoke({
      idea: userInput,
      aspectRatio,
      format,
    });

    if (result.includes("CONTENT_POLICY_VIOLATION")) {
      throw new Error("Your prompt violates our content safety policy.");
    }

    return result.trim();
  }

  async generateAd(
    refinePrompt: string,
    type: AdType,
    aspectRatio: string,
  ): Promise<Buffer> {
    if (type === "VIDEO") {
      throw new Error("Video generation not yet implemented in MVP.");
    }
    try {
    
      const response = await this.genAi.models.generateContent({
        model: "gemini-3-pro-image-preview",
        contents: [{ role: "user", parts: [{ text: refinePrompt }] }],
        config: {
          responseModalities: ["IMAGE"],
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: "2k",
            // personGeneration: PersonGeneration.ALLOW_ALL,
          },
        },
      });

      const candidates  = response?.candidates
      if (!candidates || candidates.length === 0){
        throw new Error("AI_GENERATION_FAILED: No response candidates.");
      } 

      const parts = candidates[0]?.content?.parts
      const imagePart = parts?.find((p: any) => p.inlineData);

      if (!imagePart || !imagePart.inlineData?.data){
        throw new Error(
          "AI_GENERATION_FAILED: Image data not found in response parts.",
        );
      }

      const buffer = Buffer.from(imagePart.inlineData.data, "base64");
      return buffer;

    } catch (error: any) {
      console.error(`[AI_GENERTION_ERROR]: `, error?.message);
      throw new Error(`Media Genereation Failed: `, error.message);
    }
  }
}
