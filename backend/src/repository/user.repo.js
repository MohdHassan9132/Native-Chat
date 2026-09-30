import {prisma} from '../db/index.js'

class UserRepo{
    async create({username,phoneNumber,bio}){
        const user = await prisma.user.create({
            data:
            {
                name: username,
                phoneNumber,
                bio
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
}

export const userRepo = new UserRepo()