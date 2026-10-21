import { userRepo } from "../../repository/user.repo.js"
import { validateEmail, validateName, validatePhoneNumber } from "../../validators/user.validator.js"
import {ApiError} from '../../utils/api.error.js'
import {jsonwebtokens} from '../jwt/jwt.service.js'

class UserService {
    async completeProfile(userId,name,email){
        const validatedEmail = validateEmail(email)
        const validatedName = validateName(name)
        const existingUser = await userRepo.getUserByEmail({email: validatedEmail})
        if(existingUser && existingUser.userId !== userId) throw new ApiError(409,"That email is already linked to another account")
        const updatedUser = await userRepo.updateUser(userId,validatedEmail,validatedName)
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
