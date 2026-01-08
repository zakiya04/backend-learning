import {asyncHandler} from "../utils/ayncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"


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

async function generateAccessTokenAndRefreshToken(userId){
    try {

        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Could not create Access or Refresh Token!")
    }
    
};

export const loginUser = asyncHandler(async (req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        throw new ApiError(400, "Username or Password Not Given")
    }
    const user = User.findOne({
        $or:[{username},{password}]
    })

    if(!user){
        throw new ApiError(500, "User does not exist!")
    }

    const isPasswordValid = await user.isPasswordValid(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Password is incorrect!!")
    }
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

    const options = {
        httpsOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options);

});

export const logOut = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(req.body._id,{$unset:{ refreshToken: undefined }},{ new: true});

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged Out!"))
});

export const refreshToken = asyncHandler(async (req,res)=>{
    try {
        const token = req.cookies?.refreshToken || req.headers?.refreshToken;
        if(!token) throw new ApiError(400, "Refresh_token not provided!");

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if(!decodedToken) throw new ApiError(500, "Refresh-Token does not exist!");

        const user = await User.findById(decodedToken?._id);
        if(!user) throw new ApiError(500, "Token not identified");

        if(token !== user?.refreshToken){
            throw new ApiError(500, "refresh token expired!!!")
        }

        const {accessToken, newrefreshToken} = generateAccessTokenAndRefreshToken(user._id);

        const option ={
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .cookie("accessToken",accessToken, option)
        .cookie("refreshToken", newrefreshToken, option)
        .json(new ApiResponse (200, {accessToken, refreshToken: newrefreshToken} , "Access Token refreshed !!"))
        
    } catch (error) {
        
    }
});

export const chnageCurrentPassword = asyncHandler(async(req,res)=>{
    const {newPassword, oldPassword} = req.body;
    if(!newPassword || !oldPassword) throw new ApiError(200,"Please fill the credentials!");

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordValid(oldPassword)
    if(!isPasswordCorrect) throw new ApiError(500, "Password is icorrect!");

    user.password = newPassword;
    user.save({validateBeforeSave: false});

    return res.status(200).json(new ApiResponse(200,{},"Password cahnged successfully!"))

});

export const getCurrentUser = asyncHandler( async (req,res)=>{
    const user = req.user;
    return res.status(200).json(new ApiResponse(200, user, "Current User found!"))
});

export const changeAvatar = asyncHandler(async(req,res)=>{
    const localAvatarFile = req.file?.path;
    if(!localAvatarFile) throw new ApiError(500,"avatar file is missing!");

    const avatar = await uploadOnCloudinary(localAvatarFile);
    if(!avatar) throw new ApiError(500, "Could not upload to Cloudinary");

    const user = User.findByIdAndUpdate(req.user?._id,{
        $set:{
            avatar: avatar.url
        }
    },{new: true}).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user ,"Avatar Changed Successfully!"))
});

export const changecoverImage = asyncHandler(async(req,res)=>{
    const localCoverFile = req.file?.path;
    if(!localCoverFile) throw new ApiError(500,"avatar file is missing!");

    const avatar = await uploadOnCloudinary(localCoverFile);
    if(!avatar) throw new ApiError(500, "Could not upload to Cloudinary");

    const user = User.findByIdAndUpdate(req.user?._id,{
        $set:{
            coverImage: coverImage.url
        }
    },{new: true}).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user ,"Cover Image Changed Successfully!"))
});

export const changeCredentials = asyncHandler(async (req,res)=>{
   const {fullName, email} = req.body;
   if(!fullName || !email) throw new ApiError(400, "Credentials not applied properly");
   
   const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            fullName,
            email
        }
   },{new: true}).select("-password -refreshToken");

   return res.status(200).json(new ApiResponse(200, user, "User Update!"))
});