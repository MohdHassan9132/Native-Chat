import {prisma} from '../db/index.js'

class UserRepo{
    async create({phoneNumber}){
        const user = await prisma.user.create({
            data:
            {
                phoneNumber,
            }
        })
        return user
    }
    async getUserById({userId}){
        const user = await prisma.user.findUnique({
            where:{
                userId: userId
            }
        })
        return user
    }
    async getUserByPhoneNumber({phoneNumber}){
        const user = await prisma.user.findFirst({
            where:{
                phoneNumber
            }
        })
        return user;
    }
    async saveHashedTokenToDB({userId,hashedToken}){
        const user = await prisma.user.update({
            where:{
                userId,
            },
            data:{
                refreshToken: hashedToken
            }
        })
        if(user){
            return true;
        }
    }
    async updateUser(userId,bio,name){
        const updatedUser = await prisma.user.update({
            where:{
                userId,
            },
            data:{
                bio,
                name
            }
        })
        return updatedUser
    }
    async getUserByEmail({email}){
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user;
    }
}

export const userRepo = new UserRepo()