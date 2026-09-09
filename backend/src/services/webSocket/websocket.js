import { Server } from "socket.io"
import { eventRouter } from "../../router/event.router.js"
class WebSocket{
    constructor(httpServer){
        this.server = new Server(httpServer,{
            cors: "localhost:3000"
        }) 
    }
    initListeners(connectionHandler){
        this.server.on("connection",connectionHandler)
    }
    emitToClients(event,message){
        console.log(`emitting this message to the clients with eventName$`,event,message)
        this.server.emit(event,{message})
    }
    

    
}
export default WebSocket