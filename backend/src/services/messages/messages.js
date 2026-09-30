class MessageService {

    constructor(redis, webSocket, serverId) {
        this.redis = redis
        this.webSocket = webSocket
        this.serverId = serverId
    }

    async sendMessage(message) {
        // TODO: look up the receiver's socket/server in Redis; deliver directly
        // if they are on this server, otherwise publish.
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
        // TODO: look up the receiver's socketId in Redis and emit "new" to it.
    }
}

export default MessageService