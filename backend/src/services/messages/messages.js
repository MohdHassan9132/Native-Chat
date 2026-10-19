class MessageService {

    constructor(webSocket) {
        this.webSocket = webSocket
    }

    async sendMessage(message) {
        
    }

    deliverMessage(data) {
        console.log(
            "message received from redis",
            data
        )
    
    }
}

export default MessageService