import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/api.response.js'
import { authService } from '../services/auth/auth.service.js'

const register = asyncHandler(async(req,res)=>{
    const {phoneNumber} = req.body
    const otpService = req.app.get('otpService')
    const challengeId = await authService.register(phoneNumber,otpService);
    return res.status(200).json(new ApiResponse(200,"challenge generated",{challengeId}))
})

const verifyRegistration = asyncHandler(async(req,res)=>{
    const {challengeId,userOTP} = req.body
    const otpService = req.app.get('otpService')
    const {refreshToken,accessToken,dbUser} = await authService.verifyRegistration(challengeId,userOTP,otpService)
    return res.status(201)
    .cookie('refreshToken',refreshToken)
    .cookie('accessToken',accessToken)
    .json(new ApiResponse(201,"User registration verified successfully",{userData: dbUser}))
})

export{register,verifyRegistration}