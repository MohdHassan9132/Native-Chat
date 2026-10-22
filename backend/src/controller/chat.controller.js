import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/api.response.js'

const createChat = asyncHandler(async(req,res)=>{
    const {phoneNumber} = req.body
    const chatService = app.get('chatService')
    const newChat = await chatService.create({
        phoneNumber,
        userObject: req.user
    })
    return res.status(201).json(new ApiResponse(201,"Chat created successfully",newChat))
})

const getChats = asyncHandler(async(req,res)=>{
    const chatService = app.get('chatService')
    const chats = await chatService.getChats({
        userId: req.user.userId
    })
    return res.status(200).json(new ApiResponse(200,"Chats retrieved successfully",chats))
})

export {createChat,getChats}