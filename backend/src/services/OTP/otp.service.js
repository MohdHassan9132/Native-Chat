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
        const isBlocked = await this.redisDB.readFromRedis(phoneNumber)
        if (isBlocked) {
            throw new ApiError(429,"OTP generation temporarily blocked");
        }
        const challengeExists = await this.redisDB.readByPhoneNumber(phoneNumber);
        console
            .log(challengeExists)
        if (challengeExists.total > 0) {
            throw new ApiError(409, "Challenge already exists")
        }
        const otp = crypto.randomInt(100000, 1000000).toString();
        const HmacOTP = this.generateHmacOTP(otp);
        const otpObject = {
            phoneNumber,
            HmacOTP,
            verificationAttempts: 3,
            regenrationAttempts: 3,
        };
        const isSaved = await this.redisDB.writeToRedisWithTTL(key, otpObject);
        return otp;
    }
    async validateOTP(key, userOTP) {
        const redisObject = await this.redisDB.readFromRedis(key);
        if (!redisObject) {
            throw new ApiError(404, "challenge Not Found");
        }
        const isValid = this.generateHmacOTP(userOTP) === redisObject.HmacOTP;
         if (!isValid) {
            await this.redisDB.updateNumRedis(key, "verificationAttempts", -1);
             if (redisObject.verificationAttempts == 1) {
            await this.redisDB.writeToRedisWithTTL(redisObject.phoneNumber, "Blocked", 86400)
            await this.redisDB.deleteFromRedis(key)
            throw new ApiError(429, "Too many invalid OTP attempts")
        }
            throw new ApiError(401, "Invalid OTP");
        }
       
        await this.redisDB.deleteFromRedis(key);
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
