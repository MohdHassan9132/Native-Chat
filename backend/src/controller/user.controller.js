import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api.response.js";
import {userService} from "../services/user/user.service.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {name,phoneNumber} = req.body
    const {
        user,
        accessToken,
        refreshToken,
    } = await userService.registerUser({
        name,
        phoneNumber,
    })
    res.status(201)
    .cookie('accessToken',accessToken)
    .cookie('refreshToken',refreshToken)
    .json(new ApiResponse(201,'user registered successfully',user))
})

export{registerUser}