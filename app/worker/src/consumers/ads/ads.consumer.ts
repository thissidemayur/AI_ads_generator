import { createAppWorker } from "../../worker"
import { adProcessor } from "./ads.processor";

export const createAdWorker = () =>{
    return createAppWorker("ad-generation-queue",adProcessor);
}
