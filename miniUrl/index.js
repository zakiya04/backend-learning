import express from "express";
import path from 'path';
import { urlRouter } from "./routes/url.route.js";
import homeRouter from "./routes/home.route.js";
import userRoute from "./routes/user.route.js";


const PORT = 1000
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))


app.use("/url", urlRouter);
app.use("/",homeRouter);
app.use('/user', userRoute)


app.listen(PORT,()=> console.log("Server is Running!"))