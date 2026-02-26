import type { ISSEManager } from "@project/shared";
import { createSubscriber } from "../config/redis";
import {EventEmitter} from "events"

export class SSEManager implements ISSEManager {
    private subscriber = createSubscriber()
    private internalEvents = new EventEmitter()

    constructor(){
        // step1: subscribe to a PATTERN(all add progress channels using wildcard '*' )
        this.subscriber.psubscribe("ad-progress:*")

        // Step2: Listen for msgs matching that pattern 
        this.subscriber.on("pmessage",(pattern,channel,message)=>{
            
            const adId = channel.split(":")[1]
            // emit an internal event named after the adId
            this.internalEvents.emit(`update:${adId}`, message);
        })

        this.subscriber.on("error",(err)=>{
            console.error("[SSE_REDIS_SUBSCRIBER_ERROR]: ", err)
        })

    }

    joinStream(adId:string, onMessage:(data:string)=>void){
        const eventName=`update:${adId}`
        // add listner
        this.internalEvents.on(eventName,onMessage)

        // cleanup(unsubscribe events)
        return ()=>{
            this.internalEvents.off(eventName,onMessage)
        }
    }
}