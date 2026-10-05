import { chatRepo } from '../../repository/chat.repo.js'
import { userRepo } from '../../repository/user.repo.js'
import { ApiError } from '../../utils/api.error.js'
import { validatePhoneNumber } from '../../validators/user.validator.js'
class ChatService {
    async create({
        phoneNumber,
        userObject//The user who is creating the chat,coming from the req.user
    }) {
        if (!phoneNumber) {
            throw new ApiError(400, "Phone Number is required")
        }
        const validatedPhonenumber = validatePhoneNumber(phoneNumber)
        const user2 = await userRepo.getUserByPhoneNumber({
            phoneNumber: validatedPhonenumber
        })
        if (!user2) {
            throw new ApiError(404, "User is not on the platform")
        }
        const [user1Id, user2Id] =
            userObject.userId < user2.userId
                ? [userObject.userId, user2.userId]
                : [user2.userId, userObject.userId]
        try {
            const chat = await chatRepo.create({
                user1Id,
                user2Id,
                chatType: "Individual"
            })
            return chat
        } catch (error) {
            console.log(error)
            throw new ApiError(500, "Internal Server Error")
        }
    }
    async getChats({
        userId
    }) {
        const chats = await chatRepo.getChats({
            userId
        })
        return chats
    }
}

export const chatService = new ChatService()