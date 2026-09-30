import { Server } from "socket.io"
import { verifySocketConnection } from "../../middlewares/auth.middleware.js"

class WebSocket {

    constructor(httpServer) {

        this.server = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        })
    }

    initListeners(connectionHandler) {
        this.server.use((socket,next)=>{
            verifySocketConnection(socket,next)
        })

        this.server.on(
            "connection",
            connectionHandler,
        )
    }

    emitToClients(event, payload) {

        console.log(
            "emitting this message to the clients",
            event,
            payload
        )

        this.server.emit(
            event,
            { message }
        )
    }

    emitToSocketId(socketId,event,payload) {

        this.server
            .to(socketId)
            .emit(event, payload)
    }
}

export default WebSocket