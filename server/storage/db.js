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
    return result.rows[0];
}

async function getJokes(pageNum, pageSize){
    if(!pageNum)
        pageNum = 1;
    
    if(pageNum < 0)
        pageNum = 1;

    if(!pageSize)
        pageSize = 100;

    if(pageSize < 0)
        pageSize = 100;

    const offset = (pageNum - 1) * pageSize;

    const result = await query("SELECT * FROM jokes ORDER BY id DESC LIMIT $1 OFFSET $2 ", [pageSize, offset]);
    return result.rows;
}

export default { getUserRecordByName, getJokes };