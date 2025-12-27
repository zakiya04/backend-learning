import pool from "../connection.js";


export async function createUrl(redirectUrl, shortUrl, creater){
  const result = await pool.query("INSERT INTO miniurl (short_url, redirect_url, created_by) VALUES($1, $2, $3) RETURNING *",[shortUrl, redirectUrl, creater]);
  return result.rows[0];
};

export async function getUrl(url){
  const result = await pool.query("UPDATE miniurl SET visit_history = COALESCE(visit_history, '[]'::jsonb) || to_jsonb(NOW()) WHERE short_url = $1 RETURNING *",[url]);
  return result.rows[0]
};

export async function getClicks(url){
  const result = await pool.query("SELECT visit_history FROM miniurl WHERE short_url = $1",[url]);
  return result.rows[0].visit_history.length;
};

export async function getAllUrls(creater){
  const result = await pool.query("SELECT * FROM miniurl WHERE created_by = $1",[creater]);
  return result.rows;
}