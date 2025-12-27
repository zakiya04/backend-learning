import { signUp,logIn} from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.service.js";

export async function handleSignUp(req,res){
   const {name,email,password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message:"Some credentials not applied!"})   
  }
  try{
    const user = await signUp(name,email,password);
    return res.redirect("/");
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:"Couldn't create the user!"})
  }
};

export async function handleLogIn(req,res){
  const {email,password} = req.body;
  if (!email || !password){
    res.render('login',{message: "credentials not applied"})
  };
  
  try{
    const user = await logIn(email.password);

    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uuid",sessionId)

    return res.redirect('/')
  }
  catch(err){
   console.log(err);
   res.status(500).json({message:"Couldnt Log In"})
  }
}