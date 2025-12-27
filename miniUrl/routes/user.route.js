import express from 'express';
import { handleSignUp, handleLogIn} from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.post("/", handleSignUp);
userRoute.post("/login",handleLogIn)

export default userRoute;