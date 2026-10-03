import crypto from "node:crypto";
import { jsonwebtokens } from "../jwt/jwt.service.js";
import { ApiError } from "../../utils/api.error.js";
import { userRepo } from "../../repository/user.repo.js";
class OTPService {
    constructor(redisDB) {
        this.redisDB = redisDB;
    }
    generateHmacOTP(otp) {
        const hashedOTP = crypto
            .createHmac("sha256", process.env.HMAC_KEY)
            .update(otp)
            .digest("hex");
        return hashedOTP;
    }
    async generateOTP(key, phoneNumber) {
        console.log('Inside generateOTPc')
        const isBlocked = await this.redisDB.readFromRedis(phoneNumber)
        console.log(isBlocked)
        if(isBlocked){
            throw new ApiError(401,`Try again after ${isBlocked}`)
        }
        const challengeExists = await this.redisDB.readByPhoneNumber(phoneNumber);
        console
        .log(challengeExists)
        if(challengeExists.total > 0){
            throw new ApiError(409,"Challenge already exists")
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);
        const HmacOTP = this.generateHmacOTP(otp);
        console.log(HmacOTP);
        const otpObject = {
            phoneNumber,
            HmacOTP,
            verificationAttempts: 3,
            regenrationAttempts: 3,
        };
        console.log(otpObject);
        const isSaved = await this.redisDB.writeToRedisWithTTL(key, otpObject);
        console.log(isSaved);
        return otp;
    }
    async validateOTP(key, userOTP) {
        const redisObject = await this.redisDB.readFromRedis(key);
        if (!redisObject) {
            throw new ApiError(404, "challenge Not Found");
        }
        if(redisObject.verificationAttempts < 1){
            const blockUser = await
             this.redisDB.writeToRedisWithTTL(redisObject.phoneNumber,"Blocked",86400)
             this.redisDB.deleteFromRedis(key)
            throw new ApiError(401,"OTP attemps exhausted")
        }
        const isValid = this.generateHmacOTP(userOTP) === redisObject.HmacOTP;
        if (!isValid) {
            await this.redisDB.updateNumRedis(key, "verificationAttempts", -1);
            throw new ApiError(401, "Invalid OTP");
        }
        await this.redisDB.deleteFromRedis(key);
        console.log(redisObject);
        const dbUser = await userRepo.create({
            phoneNumber: redisObject.phoneNumber,
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
}

export default OTPService;
