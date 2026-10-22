import Router from "express";
import { completeProfile, getUserByPhonenumber, getMe } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/complete-profile").patch(verifyJWT, completeProfile);
userRouter.route("/me").get(verifyJWT, getMe);
userRouter.route("/by-phone").post(verifyJWT, getUserByPhonenumber);

export { userRouter };
