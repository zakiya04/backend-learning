import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";


const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Conected to MongoDB!! : ${connectionInstance.connection.host}`)
    } catch (error) {
       console.log("Connection FAILED:", error);
       process.exit(1)
    }
};

export default connectDb;