import { createAdWorker } from "./consumers/ads/ads.consumer";
import { createEmailWorker } from "./consumers/email/email.consumer";

const startWorker = async () => {
  console.log("-----------------------------------------");
  console.log("👷 WORKER PROCESS STARTING...");
  console.log("-----------------------------------------");

  try {
    // initalise all consumers here
    const emailWorker = createEmailWorker();
    const adWorker  = createAdWorker()

    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 ${signal} received. Closing workers...`);
      await Promise.all([emailWorker.close(),adWorker.close()]);

      console.log("👋 Worker shut down safely.");
      process.exit(0)

    };

    process.on("SIGINT",()=>gracefulShutdown("SIGINT"))
    process.on("SIGTERM",()=>gracefulShutdown("SIGTERM"))


  } catch (error) {
    console.error("💥 Worker Process Failed:", error);
    process.exit(1);
  }
};


startWorker()
