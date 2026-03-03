import { AiService } from "../services/ai.service";
import fs from "fs";

async function test() {
    const apiKey = process.env.GEMINI_API_KEY!;
    console.log("API_KEY: ",apiKey)
  const service = new AiService(apiKey);

  try {
    console.log("🎨 1. Testing Prompt Refinement...");
    const refined = await service.refinePrompt(
      "A futuristic car flying over a neon city",
      "16:9",
      "IMAGE",
    );
    console.log("✅ Refined Prompt:", refined);

    console.log("🖼️ 2. Testing Image Generation...");
    const buffer = await service.generateAd(refined, "IMAGE", "1:1");

    fs.writeFileSync("test-output.png", buffer);
    console.log("🚀 SUCCESS: Image saved to test-output.png");
  } catch (error: any) {
    console.error("❌ TEST FAILED:", error.message);
  }
}

test();
