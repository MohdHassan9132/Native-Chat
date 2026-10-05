import { userRepo } from "../../repository/user.repo.js"
import { validateBio, validateName, validatePhoneNumber } from "../../validators/user.validator.js"
import {ApiError} from '../../utils/api.error.js'
import {jsonwebtokens} from '../jwt/jwt.service.js'

class UserService {
    async completeProfile(userId,name,bio){
        const validatedBio = validateBio(bio)
        const validatedName = validateName(name)
        const updatedUser = await userRepo.updateUser(userId,validatedBio,validatedName)
        return updatedUser;
    }
    async getUserByPhoneNumber(phoneNumber){
        if(!phoneNumber){
            throw new ApiError(400,"Phone Number is required")
        }
        const validatedPhonenumber = validatePhoneNumber(phoneNumber)
        const user = await userRepo.getUserByPhoneNumber({
            phoneNumber: validatedPhonenumber
        })
        if(!user){
            throw new ApiError(404,"User is not on the platform")
        }
        return user;

    }
}

export const userService = new UserService()