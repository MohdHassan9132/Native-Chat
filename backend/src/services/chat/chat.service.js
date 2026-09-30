import { chatRepo } from '../../repository/chat.repo.js'
import {userRepo} from '../../repository/user.repo.js'
import { ApiError } from '../../utils/api.error.js'
class ChatService{
    async create({
        user2Id,
        userObject//The user who is creating the chat,coming from the req.user
    }){
        const user2 = await userRepo.getUserById({
            userId: user2Id
        })
        if(!user2){
            throw new ApiError(404,"User is not on the platform")
        }
        try {
            const chat = await chatRepo.create({
                user1Id: userObject.userId,
                user2Id,
                chatType: "Individual"
            })
            return chat
        } catch (error) {
            console.log(error)
            throw new ApiError(500,"Internal Server Error")
        }
    }
}

export const chatService = new ChatService()