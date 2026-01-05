import {v2 as cloudinary} from "cloudinary";
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath)=>{
 try {
    if(!localFilePath) return console.log("Could'nt the file for images!");

    const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
    console.log("file uploaded to cloudiary", response.url);

    return response;
 } catch (err) {
    fs.unlinkSync(localFilePath);
    return console.log("Could'nt Upload the file", err)
 }
};