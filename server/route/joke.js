import express from "express";
import db from "../storage/db.js";
import statusCode from "../config/statusCode.js";



const router = express.Router();

router.get("/savedjokes", (req, res, next) => {
        
    if(!req.isAuthenticated())
        return res.sendResult(null, 400, "Please sign in account first.");

    return res.sendResult("YOu get the list", 200, "success");
    
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

export default router;