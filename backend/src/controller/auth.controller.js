import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api.response.js";
import { authService } from "../services/auth/auth.service.js";

const cookieOptions = {
    httpOnly: false,
    path: "/",
    sameSite: "lax",
};

const register = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    const otpService = req.app.get("otpService");
    const challengeId = await authService.register(phoneNumber, otpService);
    return res.status(200).json(new ApiResponse(200, "OTP sent successfully", { challengeId }));
});

const verifyRegistration = asyncHandler(async (req, res) => {
    const { challengeId, userOTP } = req.body;
    const otpService = req.app.get("otpService");
    const { refreshToken, accessToken, dbUser } = await authService.verifyRegistration(challengeId, userOTP, otpService);
    return res
        .status(201)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
            new ApiResponse(201, "User registration verified successfully", {
                userData: dbUser,
                userId: dbUser.userId,
                accessToken,
                refreshToken,
            })
        );
});

const login = asyncHandler(async (req, res) => {
    const { identifier } = req.body;
    const otpService = req.app.get("otpService");
    const challengeId = await authService.login({
        identifier,
        otpService,
    });
    return res.status(200).json(new ApiResponse(200, "OTP sent successfully", { challengeId }));
});

const verifyLogin = asyncHandler(async (req, res) => {
    const { challengeId, userOTP } = req.body;
    const otpService = req.app.get("otpService");
    const { refreshToken, accessToken, dbUser } = await authService.verifyLogin({
        challengeId,
        userOTP,
        otpService,
    });
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
            new ApiResponse(200, "User logged in successfully", {
                userData: dbUser,
                userId: dbUser.userId,
                accessToken,
                refreshToken,
            })
        );
});

export { register, verifyRegistration, login, verifyLogin };
