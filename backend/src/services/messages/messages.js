

class MessageService{
    constructor(redis,webSocket){
        this.webSocket = webSocket,
        this.redis = redis
    }
    sendMessage(socket,message){
        
        this.webSocket.emitToClients("new",message)
    }
    delieverMessage(event){

    }

}
export default MessageService