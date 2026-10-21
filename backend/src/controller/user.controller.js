import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api.response.js";
import {userService} from "../services/user/user.service.js"

const completeProfile = asyncHandler(async(req,res)=>{
    const {email,name} = req.body
    const completeUser = await userService.completeProfile(req.user.userId,name,email)
    return res.status(200).json(new ApiResponse(200,"user profile completed",completeUser))
})

const getUserByPhonenumber = asyncHandler(async(req,res)=>{
    const {phoneNumber} = req.body
    const user = await userService.getUserByPhonenumber(phoneNumber)
    return res.status(200).json(new ApiResponse(200,"User fetched successfully",{user: user}))
})

export{completeProfile,getUserByPhonenumber}
