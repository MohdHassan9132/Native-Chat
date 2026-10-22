import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api.response.js";
import { userService } from "../services/user/user.service.js";
import { userRepo } from "../repository/user.repo.js";

const completeProfile = asyncHandler(async (req, res) => {
    const { bio, name } = req.body;
    const completeUser = await userService.completeProfile(req.user.userId, name, bio);
    return res.status(200).json(new ApiResponse(200, "user profile completed", completeUser));
});

const getUserByPhonenumber = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    const user = await userService.getUserByPhonenumber(phoneNumber);
    return res.status(200).json(new ApiResponse(200, "User fetched successfully", { user }));
});

const getMe = asyncHandler(async (req, res) => {
    const user = await userRepo.getUserById({ userId: req.user.userId });
    return res.status(200).json(new ApiResponse(200, "Current user fetched", {
        userId: req.user.userId,
        ...user
    }));
});

export { completeProfile, getUserByPhonenumber, getMe };
