import {userService} from '../../index.js'

class MessageService{

    constructor(redis,webSocket){
        this.webSocket = webSocket,
        this.redis = redis
    }
    sendMessage(socket,message){
        const socketId = userService.findUserSocketId(message.username)
        this.webSocket.emitToSocketId(socketId,message)
    }
    delieverMessage(event){

    }

}
export default MessageService