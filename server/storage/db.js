import { Pool } from "pg";
import config from "config";

const dbConfig = config.get("postgres_config");


const pool = new Pool({
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    max: dbConfig.max
});

async function query(text, params){
    
    return await pool.query(text, params);
}

async function getUserRecordByName(name){
    const result = await query("SELECT * FROM users WHERE username=$1", [name]);
    if(result.rows.length == 0)
        return null;
    
    return result.rows[0];
}


async function registerUserRecord(user){
    const result = await query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username", [user.username, user.password]);
    //console.log(result);
    return result.rows[0];
}


async function getJokes(pageNum, pageSize){
    if(!pageNum)
        pageNum = 1;
    
    if(pageNum < 0)
        pageNum = 1;

    if(!pageSize)
        pageSize = 30;

    if(pageSize < 0)
        pageSize = 30;

    const offset = (pageNum - 1) * pageSize;

    const result = await query("SELECT * FROM jokes ORDER BY id DESC LIMIT $1 OFFSET $2 ", [pageSize, offset]);
    return result.rows;
}


async function getJokesByCreator(creator_id, pageNum, pageSize){
    if(!creator_id)
        return null;

    if(!pageNum)
        pageNum = 1;
    
    if(pageNum < 0)
        pageNum = 1;

    if(!pageSize)
        pageSize = 30;

    if(pageSize < 0)
        pageSize = 30;

    const offset = (pageNum - 1) * pageSize;

    const result = await query("SELECT * FROM jokes WHERE creator= $1 ORDER BY id DESC LIMIT $2 OFFSET $3 ", [creator_id, pageSize, offset]);
    return result.rows;
}


async function addJoke(joke){

    const result = await query("INSERT INTO jokes (creator, created_at, title, content, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [joke.creator, joke.created_at, joke.title, joke.content, joke.category_id]);

    return result.rows[0];
}


async function addBookmark(user_id, joke_id){
    const result = await query("INSERT INTO bookmark (user_id, joke_id) VALUES ($1, $2)",
        [user_id, joke_id]);
    
    if(result.rowCount > 0)
        return true;

    return false;
    
}


async function deleteBookmark(user_id, joke_id){
    const result = await query("DELETE FROM bookmark WHERE user_id = $1 AND joke_id = $2",
        [user_id, joke_id]);
    
        
    
    return true;
}

export default { getUserRecordByName, registerUserRecord, getJokes, addJoke, getJokesByCreator, addBookmark, deleteBookmark };