import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api.response.js";
import { ApiError } from "../utils/api.error.js";
import { chatRepo } from "../repository/chat.repo.js";
import { messageRepo } from "../repository/message.repo.js";

const createChat = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    const chatService = req.app.get("chatService");
    const newChat = await chatService.create({
        phoneNumber,
        userObject: req.user
    });
    return res.status(201).json(new ApiResponse(201, "Chat created successfully", {
        ...newChat,
        currentUserId: req.user.userId
    }));
});

const getChats = asyncHandler(async (req, res) => {
    const chatService = req.app.get("chatService");
    const chats = await chatService.getChats({
        userId: req.user.userId
    });
    return res.status(200).json(new ApiResponse(200, "Chats retrieved successfully", {
        chats,
        currentUserId: req.user.userId
    }));
});

const getChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const chat = await chatRepo.getChatById(chatId);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    const isMember = chat.user1Id === req.user.userId || chat.user2Id === req.user.userId;
    if (!isMember) {
        throw new ApiError(403, "Unauthorized to access this chat");
    }

    return res.status(200).json(new ApiResponse(200, "Chat retrieved successfully", {
        ...chat,
        currentUserId: req.user.userId
    }));
});

const getChatMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const chat = await chatRepo.getChatById(chatId);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    const isMember = chat.user1Id === req.user.userId || chat.user2Id === req.user.userId;
    if (!isMember) {
        throw new ApiError(403, "Unauthorized to access this chat");
    }

    const messages = await messageRepo.getChatHistory({ chatId });
    return res.status(200).json(new ApiResponse(200, "Messages retrieved successfully", {
        messages,
        currentUserId: req.user.userId
    }));
});

export { createChat, getChats, getChat, getChatMessages };
