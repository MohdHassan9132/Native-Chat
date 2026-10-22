import Router from "express";
import { createChat, getChats, getChat, getChatMessages } from "../controller/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.route("/create").post(verifyJWT, createChat);
chatRouter.route("/get").get(verifyJWT, getChats);
chatRouter.route("/:chatId").get(verifyJWT, getChat);
chatRouter.route("/:chatId/messages").get(verifyJWT, getChatMessages);

export { chatRouter };
