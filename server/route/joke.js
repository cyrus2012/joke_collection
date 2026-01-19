import express from "express";
import db from "../storage/db.js";
import statusCode from "../config/statusCode.js";



const router = express.Router();

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 5;


function isPositiveInteger(string){
    const regExp = new RegExp("^[1-9][0-9]*$");
    return regExp.test(string);
}

function parsePageNumber(string){
    if(isPositiveInteger(string))
        return parseInt(string);

    return DEFAULT_PAGE_NUMBER;
}

function parsePageSize(string){
        if(isPositiveInteger(string))
        return parseInt(string);

    return DEFAULT_PAGE_SIZE;
}

//console.log(isPositiveInteger("1"));    //true
//console.log(isPositiveInteger("12"));   //true
//console.log(isPositiveInteger("0"));    //false
//console.log(isPositiveInteger("01"));   //false
//console.log(isPositiveInteger("1dfdf"));    //false
//console.log(isPositiveInteger("sdfds"));    //false
//console.log(isPositiveInteger("d3g"));  //false


/**
 *  query (optional)
 *  { Integer } pageNum
 *  { Integer } pageSize
 *  It returns a list of jokes stored in database in descending order of the created date and offset by (pageNumber).
 * 
 * 
 * 
 * If the client has logined, it 
 */
router.get("/jokes", async (req, res, next) => {
    
    let jokes;
    let userId = null;

    if(req.isAuthenticated())
        userId = req.user.id;
 
    const pageNum = parsePageNumber(req.query?.pageNumber);
    
    const pageSize = parsePageSize(req.query?.pageSize);
            
    try{

        jokes = await db.getJokes(pageNum, pageSize, userId);

        return res.sendResult(jokes, statusCode.success, "Success");

    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Server has problem. Cannot retrieve jokes");
    }
        
});

router.get("/myjokes", async(req, res, next) => {
    
    let jokes;

    if(!req.isAuthenticated())
        return res.sendResult(null, 400, "Please sign in account first.");

    const user_id = req.user.id;

    const pageNum = parsePageNumber(req.query?.pageNumber);
    const pageSize = parsePageSize(req.query?.pageSize);

    try{

        jokes = await db.getJokesByCreator(user_id, pageNum, pageSize);
  

        return res.sendResult(jokes, statusCode.success, "Success");

    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Server has problem. Cannot retrieve jokes");
    }
});

router.get("/savedjokes", async (req, res, next) => {
        
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    const user_id = req.user.id;

    const pageNum = parsePageNumber(req.query?.pageNumber);
    const pageSize = parsePageSize(req.query?.pageSize);

    try{
        const jokes = await db.getSavedJokes(user_id, pageNum, pageSize);
  
        return res.sendResult(jokes, statusCode.success, "Success");

    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Server has problem. Cannot retrieve jokes");
    }
    
});


router.post("/savedjokes", async (req, res, next) => {
        
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    if(!req.body?.jokeId)
        return res.sendResult(null, statusCode.requestFail, "Please provide jokeId");
    
    try{
        const joke = await db.getJokeById(req.body?.jokeId);
        if(!joke)
            return res.sendResult(null, statusCode.requestFail, `Joke with id ${req.body.jokeId} does not exit`);

        const result = await db.addBookmark(req.user.id, req.body.jokeId);
        return res.sendResult(null, statusCode.success, "success");
    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Database has problem. Cannot bookmark the joke.");
    }
    
});


router.delete("/savedjokes", async (req, res, next) => {
        
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    if(!req.body?.jokeId)
        return res.sendResult(null, statusCode.requestFail, "Please provide jokeId");
    

    try{
        const result = await db.deleteBookmark(req.user.id, req.body.jokeId);
        return res.sendResult(null, statusCode.success, "success");
    }catch(err){
        return res.sendResult(null , statusCode.serverProblem, "Database has problem. Cannot unbookmark the joke.");
    }
    
});


router.post("/joke", async (req, res, next) => {
    
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");
    
    if(!req.body?.title)
        return res.sendResult(null, statusCode.requestFail, "Please provide title.");

    if(!req.body?.content)
        return res.sendResult(null, statusCode.requestFail, "Please provide content.");


    const today = new Date();

    const joke = {
        creator:req.user.id,
        created_at: today.toLocaleString(),
        title: req.body.title,
        content: req.body.content,
        category_id:2,
    };
    
    try{
        const result = await db.addJoke(joke);

        if(!result)
            return res.sendResult(null, success, "unknown error");

        return res.sendResult(result, statusCode.success, "create joke successfully.");
        
    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Cannot add joke. Server has problem!");
    }

});

router.delete("/joke", async (req, res, next) => {
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    if(!req.body.jokeId)
        return res.sendResult(null, statusCode.requestFail, "Please provide jokeId");
    
    try{
        const result = await db.deleteJoke(req.user.id, req.body.jokeId);
        console.log(`User id ${req.user.id} has deleted joke id ${req.body.jokeId} `);
        return res.sendResult(null, statusCode.success, "delete joke success");
    }catch(err){
        return res.sendResult(null , statusCode.serverProblem, "Database has problem. Cannot unbookmark the joke.");
    }
});

router.get("/testjokes", async (req, res, next) => {
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    let jokes;
    let userId = null;

    if(req.isAuthenticated())
        userId = req.user.id;

    try{

        const pageNum = req.query?.pageNumber? req.query.pageNumber: DEFAULT_PAGE_NUMBER;
        const pageSize = req.query?.pageSize? req.query.pageSize: DEFAULT_PAGE_SIZE;
        jokes = await db.getTestJoke(userId, pageNum, pageSize);

        return res.sendResult(jokes, statusCode.success, "Success");

    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Server has problem. Cannot retrieve jokes");
    }
});

router.get("/jokescount", async (req,res, next)=> {

    let result, userId;
    const type = req.query?.type;
    

    if(req.isAuthenticated())
        userId = req.user.id;

    try{
        if(!type){
            result = await db.getCountOfAllJokes();

        }else if(type == "bookmark"){
            if(!userId)
                return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

            result = await db.getCountOfBookmarkedJokes(userId);

        }else if(type == "created"){
            if(!userId)
                return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

            result = await db.getCountOfcreatededJokes(userId);

        }else{
            return res.sendResult(null, statusCode.requestFail, "Not such count");

        }

        return res.sendResult(result, statusCode.success, "success");

    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Server has problem.");
    }


});

export default router;