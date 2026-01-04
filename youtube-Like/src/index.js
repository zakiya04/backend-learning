import dotenv from 'dotenv';
import connectDb from './db/db.js';
import app from './app.js';


dotenv.config({
    path: './.env'
})

connectDb()
.then(
    ()=>{app.listen(process.env.PORT)|| 5000 ,()=>{
        console.log("Server connect!!")
    }}
).catch(err =>{console.log("Server could'nt connect!")});