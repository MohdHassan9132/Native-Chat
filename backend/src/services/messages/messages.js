import { events } from "../../config/event.config.js";
import { messageRepo } from "../../repository/message.repo.js";
import { chatRepo } from "../../repository/chat.repo.js";
import { prisma } from "../../db/index.js";
import { ApiError } from "../../utils/api.error.js";

function validateMessagePayload(payload) {
    if (!payload || typeof payload !== "object") {
        throw new ApiError(400, "Message payload must be an object");
    }

    const chatId = payload.chatId;
    const content = payload.content || payload.text;

    if (!chatId || typeof chatId !== "string") {
        throw new ApiError(400, "Valid chatId is required");
    }

    if (!content || typeof content !== "string" || !content.trim()) {
        throw new ApiError(400, "Message content cannot be empty");
    }

    return {
        chatId: chatId.trim(),
        content: content.trim(),
        receiverId: payload.receiverId ? String(payload.receiverId).trim() : null
    };
}

class MessageService {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }

    async send(currentUser, socketId, payload) {
        const cleanPayload = validateMessagePayload(payload);

        const chat = await chatRepo.getChatById(cleanPayload.chatId);
        if (!chat) {
            throw new ApiError(404, "Chat room not found");
        }

        const isMember = chat.user1Id === currentUser.userId || chat.user2Id === currentUser.userId;
        if (!isMember) {
            throw new ApiError(403, "Unauthorized to send messages in this chat");
        }

        const receiverId = cleanPayload.receiverId ||
            (chat.user1Id === currentUser.userId ? chat.user2Id : chat.user1Id);

        const savedMessage = await messageRepo.saveMessage({
            chatId: cleanPayload.chatId,
            senderId: currentUser.userId,
            receiverId,
            content: cleanPayload.content
        });

        // Update chat updatedAt for ordering chats on the home page
        await prisma.chat.update({
            where: { chatId: cleanPayload.chatId },
            data: { updatedAt: new Date() }
        }).catch((err) => {
            console.error("Failed to update chat updatedAt:", err.message);
        });

        this.deliveryService.broadcastMessage(
            cleanPayload.chatId,
            events.message.new,
            savedMessage
        );

        return savedMessage;
    }
}

export { validateMessagePayload };
export default MessageService;
