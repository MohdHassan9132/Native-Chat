import { prisma } from '../db/index.js';

class ChatRepo {
    async create({
        user1Id,
        user2Id,
        chatType,
    }) {
        const chat = await prisma.chat.upsert({
            where: {
                user1Id_user2Id: {
                    user1Id,
                    user2Id
                }
            },
            create: {
                user1Id,
                user2Id,
                chatType
            },
            update: {}
        });
        return chat;
    }

    async getChats({
        userId
    }) {
        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { user1Id: userId },
                    { user2Id: userId }
                ]
            },
            include: {
                user1: true,
                user2: true,
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                    include: {
                        sender: { select: { userId: true, name: true } }
                    }
                }
            },
            orderBy: {
                updatedAt: "desc"
            }
        });
        return chats;
    }

    async getChatById(chatId) {
        const chat = await prisma.chat.findUnique({
            where: {
                chatId
            },
            include: {
                user1: true,
                user2: true
            }
        });
        return chat;
    }
}

export const chatRepo = new ChatRepo();
