import { jsonwebtokens } from "../services/jwt/jwt.service.js";
import { ApiError } from "../utils/api.error.js";
import {asyncHandler} from '../utils/asyncHandler.js'
const verifySocketConnection = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new ApiError(401, "Auth Token is missing"));
    }

    try {

        const user = jsonwebtokens.verifyJWT({ token });
        socket.handshake.user = user;
        return next();
    } catch (error) {

        let apiError;

        if (error.name === "TokenExpiredError") {
            apiError = new ApiError(498, "Token Expired");
        } else if (error.name === "JsonWebTokenError") {
            apiError = new ApiError(401, "Invalid Token");
        } else {
            apiError = new ApiError(401, "Authentication Failed");
        }

        return next(apiError);
    }
};

const verifyJWT = asyncHandler((req,res,next) => {
    const token = req?.cookies?.accessToken
    if (!token) {
        throw new ApiError(401, "Auth Token is missing")
    }
    try {
        const user = jsonwebtokens.verifyJWT({ token })
        req.user = user
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(498, "Token Expired");
        } else if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid Token");
        } else {
            throw new ApiError(401, "Authentication Failed");
        }

        
    }
})

export { verifySocketConnection, verifyJWT }