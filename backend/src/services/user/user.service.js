import { userRepo } from "../../repository/ user.repo.js"
import { validateName, validatePhoneNumber } from "../../validators/user.validator.js"
import {ApiError} from '../../utils/api.error.js'
import {jsonwebtokens} from '../jwt/jwt.service.js'

class UserService {

    constructor() {

        this.userMap = new Map()
    }

    insertUser({
        username,
        socketId,
        serverId
    }) {

        this.userMap.set(username, {
            socketId,
            serverId
        })
        console.log(this.userMap)
    }

    findUser(username) {

        return this.userMap.get(username)
    }

    removeUser(username) {

        this.userMap.delete(username)
    }
    async registerUser({
        name,phoneNumber
    }){
        const validatedName = validateName(name);
        const validatedPhoneNumber = validatePhoneNumber(phoneNumber)
        let user;
        try {
            user = await userRepo.create({
                username: name,
                phoneNumber
            })
        } catch (error) {
            throw new ApiError(409,'user already exists')
        }
        const {accessToken,refreshToken} = jsonwebtokens.generateTokens({
            user
        })
        const hashedToken = jsonwebtokens.hashToken(refreshToken)
        const isSaved = await userRepo.saveHashedTokenToDB({
            userId: user.userId,
            hashedToken,
        })
        if(isSaved){
            return {
                user,
                accessToken,
                refreshToken,
            }
        }
        

    }
}

export const userService = new UserService()