import {prisma} from '../db/index.js'

class UserRepo{
    async create({username}){
        const user = await prisma.user.create({
            data:
            {
                name: username,
            }
        })
        return user
    }
}

export const userRepo = new UserRepo()