import { rateLimit } from 'express-rate-limit'
import { ApiError } from '../utils/api.error.js'
export const rateLimiter = function ({
    time,
    limit,
    message
}) {
    if(typeof message !== "string" || message.trim() === ''){
        message = "Too many request, Please try again later."
    }
    return rateLimit({
        windowMs: time,
        limit: limit,
        standardHeaders: true,
        legacyHeaders: true,
        ipv6Subnet: 56,
        handler: (req, res, next, options) => {
            next(new ApiError(429, message))
        }
    })
}



// message: async(req,res,next)=>{
//         return res.status(429).json(
//             {
//                 statusCode: 429,
//                 message: "Auth Endpoints are restricted"
//             }
//         )
//     }
