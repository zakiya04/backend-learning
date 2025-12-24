import pool from "../connection.js";


export async function createUrl(redirectUrl, shortUrl){
  const result = await pool.query("INSERT INTO miniurl (short_url, redirect_url) VALUES($1, $2) RETURNING *",[shortUrl, redirectUrl]);
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

export async function getAllUrls(){
  const result = await pool.query("SELECT * FROM miniurl");
  return result.rows;
}