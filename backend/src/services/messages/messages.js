class MessageService {

    constructor(userService, redis, webSocket, serverId) {
        this.userService = userService
        this.redis = redis
        this.webSocket = webSocket
        this.serverId = serverId
    }

    async sendMessage(message) {
        const user = this.userService.findUser(message.recieverName)
        // User exists on this server
        if (user) {
            this.webSocket.emitToSocketId(
                user.socketId,
                message
            )
            return
        }
        // User isn't on this server.
        // Try sending through Redis.
        await this.redis.publish(
            "messages",
            JSON.stringify({
                serverId: this.serverId,
                message
            })
        )
    }

    deliverMessage(data) {
        console.log(
            "message received from redis",
            data
        )
        const user = this.userService.findUser(
            data.message.recieverName
        )

        if(!user){
            return
        }

        this.webSocket.emitToSocketId(
            user.socketId,
            data.message
        )
    }
}

export default MessageService