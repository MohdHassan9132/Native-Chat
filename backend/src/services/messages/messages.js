

class MessageService{
    constructor(redis,webSocket){
        this.webSocket = webSocket,
        this.redis = redis
    }
    sendMessage(eventName,message){
        console.log(`recieved message from router with event  redirecting to clients`,eventName,message)
        this.webSocket.emitToClients("new",message)
    }
    delieverMessage(event){

    }

}
export default MessageService