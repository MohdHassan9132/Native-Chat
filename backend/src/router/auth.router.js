import Router from 'express'
import { register, verifyRegistration,login,verifyLogin } from '../controller/auth.controller.js'
const authRouter = Router()
authRouter.route('/register').post(register)
authRouter.route('/register/verify').post(verifyRegistration)
authRouter.route('/login').post(login)
authRouter.route('/login/verify').post(verifyLogin)
export {authRouter}