import { events } from "../config/event.config.js"
import { socketAsyncHandler } from "../utils/asyncHandler.js"
export function eventRouter(socket,dependencies) {
    const {messagingService,chatService} = dependencies 
    const eventRegistry = {
        [events.chat.join]: socketAsyncHandler(async(sock,args)=>{
            const [[chatId]] = args
            console.log(chatId)
            return await chatService.joinChatRoom(sock.user,sock.id,chatId)
        }),
        [events.message.send]: socketAsyncHandler(async(sock,args)=>{
            const [chatId] = args
            return await messagingService.send(sock.user,sock.id,chatId)
        })
    };
    socket.onAny(async(eventName,...args)=>{
        const handler = eventRegistry[eventName]
        if(!handler){
            console.log(`Unhandled event type string ${eventName}`)
            return
        }
        await handler(socket,args)
    })
}