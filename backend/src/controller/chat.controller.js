import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/api.response.js'
import { chatService } from "../services/chat/chat.service.js";

const createChat = asyncHandler(async(req,res)=>{
    const {user2Id} = req.body
    const newChat = await chatService.create({
        user2Id,
        userObject: req.user
    })
    return res.status(201).json(new ApiResponse(201,"Chat created successfully",newChat))
})

export {createChat}