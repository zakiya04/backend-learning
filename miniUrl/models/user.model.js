import pool from "../connection.js";

export async function signUp(name,email,password){
  const result = await pool.query(`INSERT INTO "user" (name,email,passsword) VALUES ($1, $2, $3) RETURNING *`,[name,email,password]);
  return result.rows[0];
}