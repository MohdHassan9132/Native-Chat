class DeliveryService {
    constructor(webSocketInstance) {
        this.webSocket = webSocketInstance;
    }

    joinChannel(socketId, channelName) {
        this.webSocket.subscribeToStream(socketId, channelName);
    }

    removeUserFromChannel(socketId, channelName) {
        this.webSocket.unsubscribeFromStream(socketId, channelName);
    }

    broadcastMessage(chatId, eventName, messagePayload) {
        const targetChannel = `stream:chat:${chatId}`;
        this.webSocket.emitToStream(targetChannel, eventName, messagePayload);
    }
}
export default DeliveryService;
