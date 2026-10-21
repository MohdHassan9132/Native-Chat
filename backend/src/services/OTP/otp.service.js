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
      const blockedUntil = isBlocked.BlockedUntil;
      const alternateIdentifierType = identifierType === "email" ? "phoneNumber" : "email";
      throw new ApiError(
        429,
        "This contact is temporarily blocked",
        { blockedUntil, identifierType, alternateIdentifierType },
      );
    }
    const challengeExists = await this.otpRepo.readFromIdentifierHash(identifierHash)
    if (challengeExists.total > 0) {
      const existing = challengeExists.documents?.[0];
      if (existing?.value?.purpose === purpose && existing?.value?.identifierType === identifierType) {
        return {
          challengeId: existing.id.split(":").at(-1),
          otp: null,
          alreadyExists: true,
        };
      }
      throw new ApiError(409, "A verification is already in progress for this contact");
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
    return { challengeId, otp, alreadyExists: false };
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
        const blockedUntil = new Date(Date.now() + 86400 * 1000).toISOString();
        await this.otpRepo.createBlockedUser(
          redisObject.identifierHash,
          {
            Blocked: true,
            BlockedUntil: blockedUntil,
          },
          86400,
        );
        await this.otpRepo.deleteOtp(challengeId);
        throw new ApiError(429, "This contact is temporarily blocked", {
          blockedUntil,
          identifierType: redisObject.identifierType,
          alternateIdentifierType: redisObject.identifierType === "email" ? "phoneNumber" : "email",
        });
      }
      throw new ApiError(401, "Invalid OTP");
    }

    await this.otpRepo.deleteOtp(challengeId);
    return redisObject;
  }
}

export default OTPService;
