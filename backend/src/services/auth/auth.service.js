import crypto from 'node:crypto'
import { userRepo } from '../../repository/user.repo.js'
import { ApiError } from '../../utils/api.error.js'
import { validatePhoneNumber } from '../../validators/user.validator.js'
import { jsonwebtokens } from '../jwt/jwt.service.js'
import {smsService} from '../SMS/sms.service.js'
import { cryptoService } from '../crypto/crypto.service.js'
class AuthService {
    async register(phoneNumber,otpService) {
        const validatedPhonenumber = validatePhoneNumber(phoneNumber)
        const isUser = await userRepo.getUserByPhoneNumber({
            phoneNumber: String(validatedPhonenumber) 
        })
        if(isUser){
            throw new ApiError(409,"User already exists")
        }
        const challengeId = crypto.randomUUID()
        const otp = await otpService.generateOTP(challengeId,validatedPhonenumber,"register");
        console.log(otp)
        // const sendToUser = await smsService.sendSMS({
        //     otp,
        //     phoneNumber: validatedPhonenumber
        // })
        // if(!sendToUser){
        //     throw new ApiError(503,"OTP service is unavailable")
        // }
        return challengeId;
    }
    async verifyRegistration(challengeId,userOTP,otpService){
        const verifiedUser = await otpService.validateOTP(challengeId,userOTP);
        const decryptedPhoneNumber = cryptoService.decrypt(verifiedUser.encryptedPhone)
            const dbUser = await userRepo.create({
            phoneNumber: decryptedPhoneNumber,
        });
        const { accessToken, refreshToken } = jsonwebtokens.generateTokens({
            user: dbUser,
        });
        const hashedRefreshToken = jsonwebtokens.hashToken(refreshToken);
        await userRepo.saveHashedTokenToDB({
            userId: dbUser.userId,
            hashedToken: hashedRefreshToken,
        });
        return { accessToken, refreshToken, dbUser };
    }
    async login({
        phoneNumber,
        otpService
    }){
        const validatedPhonenumber = validatePhoneNumber(phoneNumber)
        const isUser = await userRepo.getUserByPhoneNumber({
            phoneNumber: validatedPhonenumber
        })
        if(!isUser){
            throw new ApiError(404,"User not found")
        }
        const challengeId = crypto.randomUUID()
        const otp = await otpService.generateOTP(challengeId,validatedPhonenumber,"login")
        console.log(otp)
        // const sendToUser = await smsService.sendSMS({
        //     otp,
        //     phoneNumber: validatedPhonenumber
        // })
        // if(!sendToUser){
        //     throw new ApiError(503,"OTP service is unavailable")
        // }
        return challengeId;
    }
    async verifyLogin({
        challengeId,
        userOTP,
        otpService
    }){
        const verifiedUser = await otpService.validateOTP(challengeId,userOTP);
        const decryptedPhoneNumber = cryptoService.decrypt(verifiedUser.encryptedPhone)
        const dbUser = await userRepo.getUserByPhoneNumber({
            phoneNumber: decryptedPhoneNumber
        })
         const { accessToken, refreshToken } = jsonwebtokens.generateTokens({
            user: dbUser,
        });
        const hashedRefreshToken = jsonwebtokens.hashToken(refreshToken);
        await userRepo.saveHashedTokenToDB({
            userId: dbUser.userId,
            hashedToken: hashedRefreshToken,
        });
        return { accessToken, refreshToken, dbUser };
    }
}

export const authService = new AuthService()
