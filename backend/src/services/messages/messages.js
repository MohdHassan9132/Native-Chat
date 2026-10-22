class MessageService {

    constructor(deliveryService) {
        this.delivePryService = deliveryService
    }
    async send(currentUser, socketId, payload) {
        const cleanPayload = validateMessagePayload(payload);

        const savedMessage = await messageRepo.saveMessage({
            chatId: cleanPayload.chatId,
            senderId: currentUser.userId,
            receiverId: cleanPayload.receiverId,
            content: cleanPayload.content
        });

       
        this.deliveryService.broadcastMessage(
            cleanPayload.chatId,
            events.message.new,
            savedMessage
        );

        return savedMessage;
    }
}

export default MessageService;
