import Router from 'express'
import { createChat } from '../controller/chat.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const chatRouter = Router()
chatRouter.route('/create').post(verifyJWT,createChat)
export {chatRouter}
