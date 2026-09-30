import Router from 'express'
import { createChat, getChats } from '../controller/chat.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const chatRouter = Router()
chatRouter.route('/create').post(verifyJWT,createChat)
chatRouter.route('/get').get(verifyJWT,getChats)
export {chatRouter}
