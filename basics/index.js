import express from "express";
import fs from "fs";
import pool from "./db.js";

const app = express();
const PORT = 8010;


//middleware
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    fs.appendFile('log.txt',`${Date.now()}:${req.method}: ${req.path}`,(err)=>{
        if(err){
            console.log(err)
        }
        next()
    })
})

//Hybrid server for mobile part
app.get("/users",async (req,res)=>{
    const allUsers = await pool.query(`SELECT * FROM "user";`);
    const html =`<ul>
      ${allUsers.rows.map((user)=>`<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>`
    res.send(html)
})

//Rest APIs
app.get("/api/users", async(req,res)=>{
    const allUsers = await pool.query (`SELECT * FROM "user"`);
    return res.json(allUsers.rows)
});

app.route("/api/users/:id").get(async(req,res)=>{
    const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`,[req.params.id]);
    const user = result.rows[0];
    return res.json(user);
}).patch(async (req,res)=>{
    const id = Number(req.params.id);
    const data = req.body;
    
    try{
      const result = await pool.query(`UPDATE "user" SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *`,[data.first_name, data.last_name,data.email,id]);
      return res.json({message: "User Updated!!"})
    }
    catch(err){
      return res.status(500).json({message:"Updation failed "})
    }

}).delete(async(req,res)=>{
   const id = Number(req.params.id);
   
   try{
    const result = await pool.query(`DELETE FROM "user" WHERE id = $1 RETURNING *`,[id]);

    if(result.rowCount == 0){
        return res.status(400).json({message:"User not found"})
    }
    return res.status(201).json({message:"User deleted!!"})

   }
   catch(err){
    return res.status(500).json({message:"Could not Update"})
   }
});

app.post('/api/users', async(req,res)=>{
    const data = req.body;
    if(!data || !data.first_name || !data.email){
      return  res.status(400).json({message:"All should be filled"})
    }
    try{
      const result = await pool.query(`INSERT INTO "user" (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *`,[data.first_name, data.last_name, data.email]);

      return res.status(201).json({message:"User Stored!!"})
    }
    catch(err){
     return res.status(500).json({status:"User creation failed!"})
    }
});


app.listen(PORT,()=> console.log("Server is running!"))