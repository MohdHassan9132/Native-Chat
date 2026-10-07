import crypto from "node:crypto";
import { ApiError } from "../../utils/api.error.js";
import { cryptoService } from "../crypto/crypto.service.js";
class OTPService {
  constructor(redisDB) {
    this.redisDB = redisDB;
  }

  async generateOTP(key, phoneNumber, purpose) {
    const phoneHash = cryptoService.generateHmac(phoneNumber);
    console.log(`PhoneHash is ${phoneHash}`);
    const isBlocked = await this.redisDB.readFromRedis(
      `otp:block:phone:${phoneHash}`,
    );
    if (isBlocked) {
      throw new ApiError(
        429,
        `OTP generation blocked for ${isBlocked.BlockedUntil}`,
      );
    }
    const challengeExists = await this.redisDB.readByPhoneHash(phoneHash);
    console.log("Challenges:", challengeExists);
    if (challengeExists.total > 0) {
      throw new ApiError(409, "Challenge already exists");
    }
    const encryptedPhone = cryptoService.encrypt(phoneNumber);
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = cryptoService.generateHmac(otp);
    const otpObject = {
      purpose,
      phoneHash,
      encryptedPhone,
      otpHash,
      verificationAttempts: 3,
      regenrationAttempts: 3,
    };
    const isSaved = await this.redisDB.writeToRedisWithTTL(
      `otp:challenge:${key}`,
      otpObject,
    );
    return otp;
  }
  async validateOTP(key, userOTP) {
    const redisObject = await this.redisDB.readFromRedis(
      `otp:challenge:${key}`,
    );
    if (!redisObject) {
      throw new ApiError(404, "challenge Not Found");
    }
    const isValid = cryptoService.generateHmac(userOTP) === redisObject.otpHash;
    if (!isValid) {
      const attemptsLeft = await this.redisDB.updateNumRedis(
        `otp:challenge:${key}`,
        "verificationAttempts",
        -1,
      );
      console.log(attemptsLeft)
      if (attemptsLeft[0] <= 0) {
        await this.redisDB.writeToRedisWithTTL(
          `otp:block:phone:${redisObject.phoneHash}`,
          {
            Blocked: true,
            BlockedUntil: new Date(Date.now() + 86400 * 1000).toISOString(),
          },
          86400,
        );
        await this.redisDB.deleteFromRedis(`otp:challenge:${key}`);
        throw new ApiError(429, "Too many invalid OTP attempts");
      }
      throw new ApiError(401, "Invalid OTP");
    }

    await this.redisDB.deleteFromRedis(`otp:challenge${key}`);
    return redisObject;
  }
}

export default OTPService;
