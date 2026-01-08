import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import jwt from "jsonweb"

export const checkJwt = asyncHandler(async (req,res,next)=>{
    try {
        const token = res.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            throw new ApiError(401, "Unautorized User!")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = User.findById(decodedToken._id).select("-password -refreshToken");
        
        if(!user){
            throw new ApiError(500,"User not found!!")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went Wrong!")
    }
})