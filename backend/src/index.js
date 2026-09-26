import 'dotenv/config'
import http from "http"
import Redis from "./services/redis/redis.js"
import WebSocket from "./services/webSocket/websocket.js"
import MessageService from "./services/messages/messages.js"
import UserService from "./services/user/user.service.js"
import { eventRouter } from "./router/event.router.js"
import { userRepo } from "./repository/ user.repo.js"


const httpServer = http.createServer((req, res) => {

    if (req.method === "GET") {

        res.writeHead(200, {
            "content-type": "application/json"
        })

        res.end(
            JSON.stringify({
                message: "Hello from backend"
            })
        )
    }
})


const serverId = process.env.PORT || 8000
const webSocket = new WebSocket(
    httpServer
)

const userService = new UserService()
const redis = new Redis()
const messagingService = new MessageService(
    userService,
    redis,
    webSocket,
    serverId
)
await redis.initRedis()
await redis.redisSubscriber(
    "messages",
    (data) => {

        const message =
            JSON.parse(data)

        messagingService.deliverMessage(
            message
        )
    }
)

webSocket.initListeners(async (socket) => {

    const username =
        socket.handshake.query.username

    userService.insertUser({
        username,
        socketId: socket.id,
        serverId
    })
    const dbUser = await userRepo.create({
        username
    })
    console.log(dbUser)

    eventRouter(
        socket,
        messagingService
    )
})


httpServer.listen(
    serverId,
    () => {
        console.log(
            `httpServer is running on PORT ${serverId}`
        )
    }
)