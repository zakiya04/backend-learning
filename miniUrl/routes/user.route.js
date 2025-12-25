import express from 'express';
import { handleSignUp } from '../controllers/user.controller.js';

export const userRoute = express.Router();

userRoute.post("/", handleSignUp);

export default userRoute;