import { events } from "../config/event.config.js";
import { socketAsyncHandler } from "../utils/asyncHandler.js";

export function eventRouter(socket, dependencies) {
    const { messagingService, chatService } = dependencies;

    const eventRegistry = {
        [events.chat.join]: socketAsyncHandler(async (sock, args) => {
            const raw = args[0];
            const chatId = Array.isArray(raw)
                ? raw[0]
                : (typeof raw === "object" && raw !== null ? raw.chatId : raw);

            if (!chatId) {
                console.error("[chat:join] Missing chatId in args:", args);
                throw new Error("Chat ID is required to join");
            }

            console.log(`[chat:join] User ${sock.user?.userId} joining room ${chatId}`);
            return await chatService.joinChatRoom(sock.user, sock.id, chatId);
        }),

        [events.chat.leave]: socketAsyncHandler(async (sock, args) => {
            const raw = args[0];
            const chatId = Array.isArray(raw)
                ? raw[0]
                : (typeof raw === "object" && raw !== null ? raw.chatId : raw);

            if (chatId) {
                sock.leave(`stream:chat:${chatId}`);
            }
            return { success: true };
        }),

        [events.message.send]: socketAsyncHandler(async (sock, args) => {
            const [payload] = args;
            return await messagingService.send(sock.user, sock.id, payload);
        })
    };

    socket.onAny(async (eventName, ...args) => {
        const handler = eventRegistry[eventName];
        if (!handler) {
            console.log(`Unhandled event type string: ${eventName}`);
            return;
        }
        await handler(socket, args);
    });
}
