
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { verifySocketConnection } from "../../middlewares/auth.middleware.js";
import { eventRouter } from "../../router/event.router.js";

class WebSocket {
  constructor(httpServer) {
    const allowedOrigins = (
      process.env.FRONTEND_ORIGINS ||
      process.env.FRONTEND_ORIGIN ||
      "http://localhost:3000,http://localhost:3001"
    )
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

    this.server = new Server(httpServer, {
      cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST"],
      },
    });
  }

  initRedisAdapter(redisPub, redisSub) {
    this.server.adapter(createAdapter(redisPub, redisSub));
  }

  eventHandler(dependencies) {
    this.server.use((socket, next) => {
      verifySocketConnection(socket, next);
    });

    this.server.on("connection", (socket) => {
      if (socket.user?.userId) {
        socket.join(`stream:user:${socket.user.userId}`);
      }

      eventRouter(socket, dependencies);
    });
  }

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
    this.server.to(roomId).emit(event, data);
  }
}

export default WebSocket;
