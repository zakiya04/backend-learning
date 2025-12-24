
import { UpdateById, deleteById, createUser, getAllUsers, getOneUser} from "../models/user.model.js";


export async function handlegetAllUsers(req,res){
    const allUsers = await getAllUsers();
    return res.json(allUsers)
};

export async function handleGetUser(req,res){
    const user = await getAllUsers();
    return res.json(user);
}

export async function handlePutUser(req,res){
    const id = Number(req.params.id);
    const data = req.body;
    
    try{
      const user = await UpdateById(id,data)
      if (!user) {
      return res.status(404).json({ message: 'User not found' });
     }
      return res.json({message: "User Updated!!"})
    }
    catch(err){
      return res.status(500).json({message:"Updation failed "})
    }
}

export async function handleDeleteUser(req,res){
   const id = Number(req.params.id);
   
   try{
    const user = await deleteById(id);
     
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    return res.status(201).json({message:"User deleted!!"})
   }
   catch(err){
    return res.status(500).json({message:"Could not Update"})
   }
}

export async function handleCreateUser(req,res){
   const data = req.body;
    if(!data || !data.first_name || !data.email){
      return  res.status(400).json({message:"All should be filled"})
    }
    try{
      const user = await createUser(data);
      if(!user){
        return res.status(500).json({message:"Could not create User"})
      }
      return res.status(201).json({message:"User Stored!!"})
    }
    catch(err){
     return res.status(500).json({status:"User creation failed!"})
    }
}