import pool from "../connection.js";

export async function signUp(name,email,password){
  const result = await pool.query(`INSERT INTO "user" (first_name,email,password) VALUES ($1, $2, $3) RETURNING *`,[name,email,password]);
  return result.rows[0];
};

export async function logIn(email,password){
  const result = await pool.query(`SELECT * FROM "user" WHERE email = $1 AND password = $2`,[email,password]);
  return result.rows[0];
};