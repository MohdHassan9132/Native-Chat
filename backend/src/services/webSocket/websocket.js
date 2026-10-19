import { Server } from "socket.io"
import {createAdapter} from "@socket.io/redis-adapter"
import { verifySocketConnection } from "../../middlewares/auth.middleware.js"

class WebSocket {

    constructor(httpServer,redis) {
        this.redis = redis
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
        this.server.adapter(createAdapter(this.redis.adapterPub,this.redis.adapterSub))

        this.server.on(
            "connection",
        connectionHandler
        )
    }
}

export default WebSocket