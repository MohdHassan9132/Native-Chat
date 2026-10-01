import Router from 'express'
import { completeProfile } from '../controller/user.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'
const userRouter = Router()
userRouter.route('/complete-profile').patch(verifyJWT,completeProfile)

export{userRouter}