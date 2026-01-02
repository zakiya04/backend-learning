import {Pool} from 'pg';
import 'dotenv/config';

export const pool = new Pool({
  user : process.env.USER,
  password : process.env.PASSWORD,
  host : process.env.HOST,
  port : process.env.PORT,
  database : process.env.DATABASE,
});

pool.connect().then(client => {console.log("DB is running!!"); client.release();}).catch(err => {console.log("Couldn't connect to DB", err)});


export async function createUrlBot(shortId,url){
  const result = await pool.query ("INSERT INTO miniurl (short_url, redirect_url, created_by) VALUES($1, $2, $3) RETURNING *",[shortId, url, null]);
  return result.rows[0];
};

