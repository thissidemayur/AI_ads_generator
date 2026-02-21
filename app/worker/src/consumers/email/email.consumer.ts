import { createAppWorker } from "../../worker"
import {emailProcessor} from "./email.proccessor"

export const createEmailWorker = () =>{
    // we telll base worker to listen on "email-queue"
    // and use our specific processor logic
    return createAppWorker("email-queue",emailProcessor)
}
