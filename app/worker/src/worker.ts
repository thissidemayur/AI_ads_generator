import { Worker, type Processor } from "bullmq";
import { redisConnection } from "./config/redis";

export const createAppWorker = (queueName:string, processor:Processor) =>{

    const worker = new Worker(queueName,processor,{
        connection:redisConnection,
        autorun:true,
        // Industrary standered: Only process 5 jobs at a time to prevent CPU spikes
        concurrency:5
    })

    worker.on("completed",(job)=>{
        console.log(`✅ [${queueName} Job ${job?.id} has completed!] `);
    })

    worker.on("failed",(job,err)=>{
        console.error(
          `❌ [${queueName} Job ${job?.id} failed: ${err?.message}]`,
        );
    })

    return worker
}