import "dotenv/config";
import http from "http";
import app from "./app.js";

import Redis from "./services/redis/redis.js";
import WebSocket from "./services/webSocket/websocket.js";
import MessageService from "./services/messages/messages.js";

import { eventRouter } from "./router/event.router.js";

const PORT = process.env.PORT || 8000;
const SERVER_ID = process.env.SERVER_ID || `server-${PORT}`;

const httpServer = http.createServer(app);

const webSocket = new WebSocket(httpServer);
const redis = new Redis();

const messagingService = new MessageService(
    redis,
    webSocket,
    SERVER_ID
);

await redis.initRedis();

await redis.redisSubscriber("messages", (data) => {
    const message = JSON.parse(data);

    messagingService.deliverMessage(message);
});

webSocket.initListeners(async (socket) => {
    eventRouter(
        socket,
        messagingService
    );
});

httpServer.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});