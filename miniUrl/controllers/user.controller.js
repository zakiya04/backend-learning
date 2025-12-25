import { signUp } from "../models/user.model.js";

export async function handleSignUp(req,res){
   const {name,email,password} = req.body;

   if(!name || !email || !password){
    return res.status(400).json({message:"Some credentials not applied!"})   
  }
  try{
    const user = await signUp(name,email,password);
    return res.render('home');
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:"Couldn't create the user!"})
  }
}