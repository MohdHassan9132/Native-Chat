import express from "express";
import {userRouter} from './router/user.router.js'
import { chatRouter } from "./router/chat.router.js";
import cookieParser from 'cookie-parser'
import { authRouter } from "./router/auth.router.js";
import { ApiResponse } from "./utils/api.response.js";

const app = express();

// Allow the Next.js frontend to call the API with cookies.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN || "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

app.use(express.json());
app.use(cookieParser())


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

app.use('/api/users',userRouter)
app.use('/api/chats',chatRouter)
app.use('/api/auth',authRouter)

app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
    const message = statusCode >= 500 ? "Something went wrong. Please try again shortly." : error.message;
    return res.status(statusCode).json(new ApiResponse(statusCode, message, error.data || undefined));
});

export default app;
