import {asyncHandler} from "../utils/ayncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


export const registerUser = asyncHandler(async (req, res)=>{
    const {fullName, username, email, password} = req.body;
    
    if([fullName, username, email, password].some((field) => field?.trim() === "")){
       throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409,"User Already Exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const cloudImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
         throw new ApiError(400, "Couldnt upload avatar!")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: avatar.url,
        cloudImage: cloudImage?.url || "",
        username: username.toLowerCase()
    })
    const createdUser = await user.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Couldn'nt create user!")
    }
    return res.status(200).json(new ApiResponse(200, createdUser, "User registered successfully!"))

});