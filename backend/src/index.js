import "dotenv/config";
import http from "http";
import app from "./app.js";

import Redis from "./services/redis/redis.js";
import WebSocket from "./services/webSocket/websocket.js";
import MessageService from "./services/messages/messages.js";

import { eventRouter } from "./router/event.router.js";
import OTPService from "./services/OTP/otp.service.js";
import OTPRepo from "./repository/otp.repo.js";

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);
const redis = new Redis();
await redis.initRedis();
await redis.initIndex();
const webSocket = new WebSocket(httpServer,redis);
const otpRepo = new OTPRepo(redis)
const OtpService = new OTPService(otpRepo)
app.set('otpService',OtpService)

const messagingService = new MessageService(
    redis,
    webSocket,
);



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