import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
});


pool.connect().then(client => {console.log("Db is running!"); client.release();}).catch(err => {console.log("Couldnt connect",err)})

export default pool;