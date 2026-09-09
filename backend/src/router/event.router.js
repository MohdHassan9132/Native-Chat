import { events } from "../config/event.config.js"

export function eventRouter(socket,messagingService){
    socket.onAny((eventName,args)=>{
        console.log("event recieved on the webSocket  with data ",eventName,args.message)
        if(eventName === events.message.send){
            messagingService.sendMessage(socket,args.message)
        }
    })
}