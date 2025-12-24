import pool from "../connection.js";

export async function getAllUsers(){
    const result = await pool.query(`SELECT * FROM "user"`);
    return result.rows
}
export async function getOneUser(){
    const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`,[req.params.id]);
    return result.rows[0];
}
export async function UpdateById(id,data){
    const result = await pool.query(`UPDATE "user" SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *`,[data.first_name, data.last_name,data.email,id]);
    return result.rows[0];
}

export async function deleteById(id){
    const result = await pool.query(`DELETE FROM "user" WHERE id = $1 RETURNING *`,[id]);
    return result.rows[0];
}
export async function createUser(data){
    const result = await pool.query(`INSERT INTO "user" (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *`,[data.first_name, data.last_name, data.email]);
    return result.rows[0];
}