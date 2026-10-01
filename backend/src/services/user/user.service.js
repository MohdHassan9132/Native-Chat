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
}

export const userService = new UserService()