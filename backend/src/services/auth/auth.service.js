import crypto from 'node:crypto'
import { userRepo } from '../../repository/user.repo.js'
import { ApiError } from '../../utils/api.error.js'
import { validatePhoneNumber } from '../../validators/user.validator.js'
import {smsService} from '../SMS/sms.service.js'
class AuthService {
    async register(phoneNumber,otpService) {
        const validatedPhoneNumber = validatePhoneNumber(phoneNumber)
        const isUser = await userRepo.getUserByPhoneNumber({
            phoneNumber: String(validatedPhoneNumber) 
        })
        if(isUser){
            throw new ApiError(409,"User already exists")
        }
        const challengeId = crypto.randomUUID()
        const otp = await otpService.generateOTP(challengeId,validatedPhoneNumber);
        const sendToUser = await smsService.sendSMS({
            otp,
            phoneNumber: validatedPhoneNumber
        })
        if(!sendToUser){
            throw new ApiError(503,"OTP service is unavailable")
        }
        return challengeId;
    }
    async verifyRegistration(challengeId,userOTP,otpService){
        const{refreshToken,accessToken,dbUser} = await otpService.validateOTP(challengeId,userOTP)
        return {refreshToken,accessToken,dbUser}
    }
}

export const authService = new AuthService()