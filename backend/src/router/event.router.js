import { events } from "../config/event.config.js"
export function eventRouter(socket, messagingService) {
    socket.onAny((eventName, args) => {
        console.log(
            "event received on the webSocket with data",
            eventName,
            args
        )

        if (eventName === events.message.send) {
            messagingService.sendMessage(
                args.message
            )
        }
    })
}