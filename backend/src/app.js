
import express from "express";
import cors from "cors";
import {userRouter} from "./router/user.router.js";
import {chatRouter} from "./router/chat.router.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./router/auth.router.js";
import { authRateLimiter } from "./middlewares/ratelimiter.middleware.js";

const app = express();

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header (e.g. server-to-server).
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/auth", authRateLimiter, authRouter);

export default app;
