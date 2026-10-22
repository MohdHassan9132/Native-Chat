import { chatRepo } from '../../repository/chat.repo.js'
import { userRepo } from '../../repository/user.repo.js'
import { ApiError } from '../../utils/api.error.js'
import { validatePhoneNumber } from '../../validators/user.validator.js'
class ChatService {
    constructor(deliveryService){
        this.deliveryService = deliveryService
    }
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
    async joinChatRoom(user,socketId,chatId){
        const isChat = await chatRepo.getChatById(chatId)
        if(!isChat){
            throw new ApiError(404,"Chat room not found")
        }
        const isMember = isChat.user1Id === user.userId || isChat.user2Id === user.userId
        if(!isMember){
            throw new ApiError(403,"Unauthorized to join this chat")
        }
        const channelName = `stream:chat:${chatId}`;
        this.deliveryService.joinChannel(socketId, channelName);
        return { success: true, message: "Joined channel successfully" };
    }
}

export default ChatService