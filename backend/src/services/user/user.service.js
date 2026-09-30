import { userRepo } from "../../repository/user.repo.js"
import { validateBio, validateName, validatePhoneNumber } from "../../validators/user.validator.js"
import {ApiError} from '../../utils/api.error.js'
import {jsonwebtokens} from '../jwt/jwt.service.js'

class UserService {

    async registerUser({
        name,phoneNumber,bio
    }){
        const validatedName = validateName(name);
        const validatedPhoneNumber = validatePhoneNumber(phoneNumber)
        const validatedBio = validateBio(bio)
        let user;
        try {
            user = await userRepo.create({
                username: name,
                phoneNumber: validatedPhoneNumber,
                bio: validatedBio
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