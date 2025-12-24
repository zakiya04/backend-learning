import express from "express";
import userRouter from "./routes/user.route.js"
import logReqRes from "./middlewares/index.middle.js";

const app = express();
const PORT = 8010;


//middleware
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"))

//Hybrid server for mobile part
app.get("/users",async (req,res)=>{
    const allUsers = await pool.query(`SELECT * FROM "user";`);
    const html =`<ul>
      ${allUsers.rows.map((user)=>`<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>`
    res.send(html)
})

//Rest APIs
app.use("/api/users", userRouter)

app.listen(PORT,()=> console.log("Server is running!"))