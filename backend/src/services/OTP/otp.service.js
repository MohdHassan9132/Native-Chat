import crypto from "node:crypto";
import { ApiError } from "../../utils/api.error.js";
import { cryptoService } from "../crypto/crypto.service.js";
class OTPService {
  constructor(otpRepo) {
    this.otpRepo = otpRepo
  }

  async generateOTP(challengeId, identifier,identifierType, purpose) {
    const identifierHash = cryptoService.generateHmac(identifier);
    const isBlocked = await this.otpRepo.getBlockedUser(identifierHash)
    if (isBlocked) {
      throw new ApiError(
        429,
        `OTP generation blocked for ${isBlocked.BlockedUntil}`,
      );
    }
    const challengeExists = await this.otpRepo.readFromIdentifierHash(identifierHash)
    if (challengeExists.total > 0) {
      throw new ApiError(409, "Challenge already exists");
    }
    const encryptedIdentifier = cryptoService.encrypt(identifier);
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = cryptoService.generateHmac(otp);
    const otpObject = {
      purpose,
      identifierHash,
      identifierType,
      encryptedIdentifier,
      otpHash,
      verificationAttempts: 3,
      regenerationAttempts: 3,
    };
    await this.otpRepo.createOtp(challengeId,otpObject);
    return otp;
  }
  async validateOTP(challengeId, userOTP) {
    const redisObject = await this.otpRepo.getOtp(challengeId);
    if (!redisObject) {
      throw new ApiError(404, "challenge Not Found");
    }
    const isValid = cryptoService.generateHmac(userOTP) === redisObject.otpHash;
    if (!isValid) {
      const attemptsLeft = await this.otpRepo.reduceVerificationAttempts(challengeId);
      if (attemptsLeft[0] <= 0) {
        await this.otpRepo.createBlockedUser(
          redisObject.identifierHash,
          {
            Blocked: true,
            BlockedUntil: new Date(Date.now() + 86400 * 1000).toISOString(),
          },
          86400,
        );
        await this.otpRepo.deleteOtp(challengeId);
        throw new ApiError(429, "Too many invalid OTP attempts");
      }
      throw new ApiError(401, "Invalid OTP");
    }

    await this.otpRepo.deleteOtp(challengeId);
    return redisObject;
  }
}

export default OTPService;
