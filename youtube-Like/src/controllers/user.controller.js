import ayncHandler from "../utils/ayncHandler.js";



const resisterUser = ayncHandler(async (req, res)=>{
    res.status(200).json({
        message:"OK"
    })
})