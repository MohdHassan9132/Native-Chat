class OTPRepo{
    constructor(redisDB){
        this.redisDB = redisDB
    }
    async createOtp(challengeId,otpObject){
        return await this.redisDB.createWithTTL(`otp:challenge:${challengeId}`,otpObject)
    }
    async getOtp(challengeId){
        return await this.redisDB.get(`otp:challenge:${challengeId}`)
    }
     async readFromIdentifierHash(identifierHash) {
        return await this.redisDB.search(
            'idx:otp',
            `@identifierHash:{${identifierHash}}`
        )
    }
    async getBlockedUser(identifierHash){
        return await this.redisDB.get(`otp:blocked:${identifierHash}`) 
    }
    async deleteOtp(challengeId){
        return await this.redisDB.delete(`otp:challenge:${challengeId}`)
    }
    async reduceVerificationAttempts(challengeId){
        return await this.redisDB.Increment(`otp:challenge:${challengeId}`,'verificationAttempts',-1)
    }
    async createBlockedUser(identifierHash,blockedObject,TTL){
        return await this.redisDB.createWithTTL(`otp:blocked:${identifierHash}`,blockedObject,TTL)
    }
    
}

export default OTPRepo
