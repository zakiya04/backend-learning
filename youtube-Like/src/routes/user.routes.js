import Router from "express";
import { loginUser, logOut, refreshToken, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {checkJwt} from "../middlewares/auth.middleware.js"

const userRouter = Router ();

userRouter.route("/register").post(upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]), registerUser);

userRouter.route("/login").post(loginUser);
userRouter.route("/refresh-token").post(refreshToken)

//secured routes (middlewres)
userRouter.route("/logout").post(checkJwt ,logOut);

export default userRouter