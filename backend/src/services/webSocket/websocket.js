import { Server } from "socket.io"

class WebSocket {

    constructor(httpServer) {

        this.server = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        })
    }

    initListeners(connectionHandler) {

        this.server.on(
            "connection",
            connectionHandler
        )
    }

    emitToClients(event, message) {

        console.log(
            "emitting this message to the clients",
            event,
            message
        )

        this.server.emit(
            event,
            { message }
        )
    }

    emitToSocketId(socketId, message) {

        this.server
            .to(socketId)
            .emit("new", message)
    }
}

export default WebSocket