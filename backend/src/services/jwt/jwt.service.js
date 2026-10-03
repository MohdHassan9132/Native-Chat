import 'dotenv/config'
import { ApiError } from "../../utils/api.error.js";
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) {
    throw new ApiError(500, "Internal Server Error")
}

class Jwt {
    verifyJWT({ token }) {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return payload
    }
    generateTokens({
        user
    }) {
        const accessToken = jwt.sign(
            {userId: user.userId},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        const refreshToken = jwt.sign(
            {userId: user.userId},
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        return{
            accessToken,refreshToken
        }
    }
    hashToken(token){
        const hashedToken = crypto.createHmac("sha256",process.env.HMAC_KEY).update(token).digest("hex")
        return hashedToken
    }
    verifyHashToken(plainToken,hashedToken){
        const plainTokenToHmac = crypto.createHmac("sha256",process.env.HMAC_KEY).update(plainToken).digest("hex")
        const isValid =  plainTokenToHmac === hashedToken
        return isValid
    }
}

export const jsonwebtokens = new Jwt()