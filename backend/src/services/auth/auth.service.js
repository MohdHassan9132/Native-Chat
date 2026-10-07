import crypto from 'node:crypto'
import { userRepo } from '../../repository/user.repo.js'
import { ApiError } from '../../utils/api.error.js'
import { validateEmail, validatePhoneNumber } from '../../validators/user.validator.js'
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
        const otp = await otpService.generateOTP(challengeId,validatedPhonenumber,"phoneNumber","register");
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
        const decryptedIdentifier = cryptoService.decrypt(verifiedUser.encryptedIdentifier)
            const dbUser = await userRepo.create({
            phoneNumber: decryptedIdentifier,
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
        identifier,
        otpService
    }){
        if(typeof identifier !== "string"){
            throw new ApiError(400,"Identifier must be of string type")
        }
        const identifierType = identifier?.includes('@') ? "email":"phoneNumber"
        let validatedIdentifier;
        if(identifierType === "email"){
            validatedIdentifier = validateEmail(identifier)
        }else if (identifierType === "phoneNumber"){
            validatedIdentifier = validatePhoneNumber(identifier)
        }else{
            throw new ApiError(400,"Invalid Identifier")
        }
        const isUser = identifierType === "email" ? await userRepo.getUserByEmail({email: validatedIdentifier}) : await userRepo.getUserByPhoneNumber({phoneNumber: validatedIdentifier})
        if(!isUser){
            throw new ApiError(404,"User not found")
        }
        const challengeId = crypto.randomUUID()
        const otp = await otpService.generateOTP(challengeId,validatedIdentifier,identifierType,"login")
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
        const decryptedIdentifier = cryptoService.decrypt(verifiedUser.encryptedIdentifier)
        const dbUser = verifiedUser.identifierType === "email" ? await userRepo.getUserByEmail({email: decryptedIdentifier}): await userRepo.getUserByPhoneNumber({phoneNumber: decryptedIdentifier})
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
