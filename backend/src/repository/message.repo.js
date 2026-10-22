import { prisma } from "../db/index.js";

class MessageRepo {
    async saveMessage({ chatId, senderId, receiverId, content }) {
        return await prisma.message.create({
            data: { chatId, senderId, receiverId, content },
            include: {
                sender: { select: { userId: true, name: true } }
            }
        });
    }

    async getChatHistory({ chatId }) {
        return await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: "asc" },
            include: {
                sender: { select: { userId: true, name: true } }
            }
        });
    }
}

export const messageRepo = new MessageRepo();
