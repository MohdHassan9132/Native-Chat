import Router from 'express'
import { register, verifyRegistration } from '../controller/auth.controller.js'
const authRouter = Router()
authRouter.route('/register').post(register)
authRouter.route('/register/verify').post(verifyRegistration)
export {authRouter}