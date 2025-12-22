import express from "express";
import Users from "./users.json" assert { type: 'json' };

const app = express();
const PORT = 8010;

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
    return res.json({status:"Pending"})
}).delete((req,res)=>{
   return res.json({status:"Pending"})
})



app.listen(PORT,()=> console.log("Server is running!"))