import express from "express";
import Users from "./users.json" assert { type: 'json' };
import fs from "fs";

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
app.get("/users",(req,res)=>{
    const html =`<ul>
      ${Users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html)
})

//Rest APIs
app.get("/api/users",(req,res)=>{
    return res.json(Users)
});

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = Users.find(user => user.id === id);
    return res.json(user);
}).patch((req,res)=>{
    const id = Number(req.params.id);
    const user = Users.find(user => user.id === id);

    Object.assign(user,req.body);

    fs.writeFile("./users.json",JSON.stringify(Users),(err)=>{
        if (err){
            console.log(err)
        }
        return res.json({status:"Updated!!"})
    })
}).delete((req,res)=>{
   const id = Number(req.params.id);
   const index = Users.findIndex(user => user.id === id);

   if(index !== -1){
    Users.splice(index,1)
   }
  
   fs.writeFile("./users.json", JSON.stringify(Users),(err)=>{
    if(err){
        console.log(err)
    }
    return res.json({status:"Success!!"})
   })
});

app.post('/api/users',(req,res)=>{
    const data = req.body;
    Users.push({id:Users.length + 1 , ...data});
    fs.writeFile("./users.json",JSON.stringify(Users),(err,data)=>{
        return res.json({status:"Success!!"})
    })
});


app.listen(PORT,()=> console.log("Server is running!"))