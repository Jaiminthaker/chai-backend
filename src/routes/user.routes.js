import {Router} from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);

export default userRouter;