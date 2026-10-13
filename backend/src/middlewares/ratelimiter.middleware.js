import {rateLimit} from 'express-rate-limit'
import {ApiError} from '../utils/api.error.js'
const authRateLimiter = rateLimit({
    windowMs: 60*60*1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: true,
    ipv6Subnet: 56,
    handler: (req,res,next,options)=>{
        next(new ApiError(429,"Auth Routes are restricted"))
    }
})

// message: async(req,res,next)=>{
//         return res.status(429).json(
//             {
//                 statusCode: 429,
//                 message: "Auth Endpoints are restricted"
//             }
//         )
//     }

export {authRateLimiter}