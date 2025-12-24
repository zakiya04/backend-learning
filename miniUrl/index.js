import express from "express";
import path from 'path';
import { router } from "./routes/url.route.js";
import { handleGetUrl, handleAnalytics, handleGetUrls} from "./controllers/url.controller.js";

const urlRoute = router
const PORT = 1000
const app = express();
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use("/url", urlRoute);

app.get("/:shorturl",handleGetUrl);
app.get("/analytics/:shorturl",handleAnalytics)
app.get("/",handleGetUrls)

app.listen(PORT,()=> console.log("Server is Running!"))