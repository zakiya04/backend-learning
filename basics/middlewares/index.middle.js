import fs from "fs";

export default function logReqRes(filename){
    return(req,res,next)=>{
      fs.appendFile(filename,`${Date.now()}:${req.method}: ${req.path}`,(err)=>{
        if(err){
            console.log(err)
        }
        next()
    })
    }
}