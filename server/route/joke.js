import express from "express";
import db from "../storage/db.js";
import statusCode from "../config/statusCode.js";



const router = express.Router();


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

    try{

        const pageNum = req.query?.pageNumber? req.query.pageNumber: 1;
        const pageSize = req.query?.pageSize? req.query.pageSize: 30;
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

    try{

        const pageNum = req.query?.pageNumber? req.query.pageNumber: 1;
        const pageSize = req.query?.pageSize? req.query.pageSize: 30;
        jokes = await db.getJokesByCreator(user_id, pageNum, pageSize);
  

        return res.sendResult(jokes, statusCode.success, "Success");

    }catch(err){
        console.error(err);
        return res.sendResult(null, statusCode.serverProblem, "Server has problem. Cannot retrieve jokes");
    }
});

router.get("/savedjokes", (req, res, next) => {
        
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    return res.sendResult("YOu get the list", statusCode.success, "success");
    
});


router.post("/savedjokes", async (req, res, next) => {
        
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");

    if(!req.body.jokeId)
        return res.sendResult(null, statusCode.requestFail, "Please provide jokeId");
    
    try{
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

    if(!req.body.jokeId)
        return res.sendResult(null, statusCode.requestFail, "Please provide jokeId");
    

    try{
        const result = await db.deleteBookmark(req.user.id, req.body.jokeId);
        return res.sendResult(null, statusCode.success, "success");
    }catch(err){
        return res.sendResult(null , statusCode.serverProblem, "Database has problem. Cannot unbookmark the joke.");
    }
    
});


router.post("/create", async (req, res, next) => {
    
    if(!req.isAuthenticated())
        return res.sendResult(null, statusCode.requestFail, "Please sign in account first.");
    
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


export default router;