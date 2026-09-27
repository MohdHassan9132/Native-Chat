import 'dotenv/config'
import { ApiError } from "../../utils/api.error.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) {
    console.log(`JWT Secrets are undefined`)
    throw new ApiError(500, "Internal Server Error")
}

class Jwt {
    async verifyJWT({ token }) {
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
        const hashedToken = bcrypt.hashSync(
            token,Number(process.env.SALT_ROUNDS)
        )
        return hashedToken
    }
    verifyHashToken(plainToken,hashedToken){
        const isValid = bcrypt.compareSync(plainToken,hashedToken)
        return isValid
    }
}

export const jsonwebtokens = new Jwt()