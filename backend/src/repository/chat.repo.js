import { prisma } from '../db/index.js'
class ChatRepo {
    async create({
        user1Id,
        user2Id,
        chatType,
    }) {
        const chat = await prisma.chat.create({
            data:{
                chatType,
                user1Id,
                user2Id,
            }
        })
        return chat
    }
    async getChats({
        userId
    }){
        const chats = await prisma.chat.findMany({
            where:{
                user1Id: userId,
            }
        })
        return chats;
    }
}

export const chatRepo = new ChatRepo()