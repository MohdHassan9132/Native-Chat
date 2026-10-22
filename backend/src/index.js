import "dotenv/config";
import http from "http";
import app from "./app.js";

import Redis from "./services/redis/redis.js";
import WebSocket from "./services/webSocket/websocket.js";
import MessageService from "./services/messages/messages.js";

import OTPService from "./services/OTP/otp.service.js";
import OTPRepo from "./repository/otp.repo.js";
import DeliveryService from "./services/delivery/delivery.service.js";
import ChatService from "./services/chat/chat.service.js";

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);
const redis = new Redis();
await redis.initRedis();
await redis.initIndex();
const otpRepo = new OTPRepo(redis);
const OtpService = new OTPService(otpRepo);
app.set("otpService", OtpService);
const webSocket = new WebSocket(httpServer);
webSocket.initRedisAdapter(redis.adapterPub, redis.adapterSub);
const deliveryService = new DeliveryService(webSocket);

const messagingService = new MessageService(deliveryService);
const chatService = new ChatService(deliveryService);
app.set("chatService", chatService);
app.set("messagingService", messagingService);

webSocket.eventHandler({ messagingService, chatService });

httpServer.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
