import Router from "express";
import {
  register,
  verifyRegistration,
  login,
  verifyLogin,
} from "../controller/auth.controller.js";
import { rateLimiter } from "../middlewares/ratelimiter.middleware.js";
const authRouter = Router();
authRouter.route("/register").post(
  rateLimiter({
    time: 60 * 60 * 1000,
    limit: 3,
    message: "Only Three registration requests are allowed per hour",
  }),
  register,
);
authRouter.route("/register/verify").post(
  rateLimiter({
    time: 60 * 60 * 1000,
    limit: 9,
    message: "only three attempts are allowed per otp",
  }),
  verifyRegistration,
);
authRouter.route("/login").post(
  rateLimiter({
    time: 60 * 60 * 1000,
    limit: 3,
    message: "only three login attempts are allowed per hour",
  }),
  login,
);
authRouter.route("/login/verify").post(
  rateLimiter({
    time: 60 * 60 * 1000,
    limit: 9,
    message: "only three attempts are allowed per otp",
  }),
  verifyLogin,
);
export { authRouter };
