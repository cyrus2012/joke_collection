import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../storage/db.js";

const router = express.Router();

passport.use("local", new LocalStrategy(async function verify(username, password, cb){
    
    try{
        const record = await db.getUserRecordByName(username);
        if(!record)
            return cb("User does not exist");


        if(password != record.password)
            return cb("Incorrect password");

        return cb(null, record);

    }catch(err){
        return cb(err);
    }

}));


router.post("/login", (req, res, next) => {
    
    passport.authenticate("local", function(err, user){
    
        if(err)
            return res.sendResult(null, 400, err);

        const loggedUser = {
            username: user.username,
            user_id: user.id,
            session_id: "q1w2e3"
        }
        
        return res.sendResult(loggedUser, 200, "login success");
    })(req, res, next);
});


export default router;