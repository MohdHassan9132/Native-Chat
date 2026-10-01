import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api.response.js";
import {userService} from "../services/user/user.service.js"

const completeProfile = asyncHandler(async(req,res)=>{
    const {bio,name} = req.body
    const completeUser = await userService.completeProfile(req.user.userId,name,bio)
    return res.status(200).json(new ApiResponse(200,"user profile completed",completeUser))
})

export{completeProfile}