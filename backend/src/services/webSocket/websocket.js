import { Server } from "socket.io"
import { createAdapter } from "@socket.io/redis-adapter"
import { verifySocketConnection } from "../../middlewares/auth.middleware.js"
import { eventRouter } from "../../router/event.router.js"
eventRouter

class WebSocket {

    constructor(httpServer) {
        this.server = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        })
    }
    initRedisAdapter(redisPub, redisSub) {
        this.server.adapter(createAdapter(redisPub, redisSub))
    }
    eventHandler(dependencies) {
        this.server.use((socket, next) => {
            verifySocketConnection(socket, next)
        })
        this.server.on("connection", (socket) => {
            eventRouter(socket,dependencies)
        })


    }
    // initListeners(connectionHandler) {
    //     this.server.adapter(createAdapter(this.redis.adapterPub,this.redis.adapterSub))

    //     this.server.use((socket,next)=>{
    //         verifySocketConnection(socket,next)
    //     })


    //     this.server.on(
    //         "connection",
    //     connectionHandler
    //     )
    // }

    subscribeToStream(socketId, streamId) {
        const socket = this.server.sockets.sockets.get(socketId);
        if (socket) socket.join(streamId);
    }

    unsubscribeFromStream(socketId, streamId) {
        const socket = this.server.sockets.sockets.get(socketId);
        if (socket) socket.leave(streamId);
    }

    emitToStream(streamId, event, data) {
        this.server.to(streamId).emit(event, data);
    }

    emitToChatId(roomId, event, data) {
        this.server.to(roomId).emit(event, data)
    }
}

export default WebSocket