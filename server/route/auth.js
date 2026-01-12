import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../storage/db.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;


passport.use("local", new LocalStrategy(async function verify(username, password, cb){
    
    try{
        const record = await db.getUserRecordByName(username);
        if(!record){
            console.log("incorrect username.")
            return cb(null, false, { message: 'Username does not exist' });
        }
        bcrypt.compare(password, record.password, function(err, result){
            if(err){
                console.error(err);
                return cb("server has problem.");
            }

            if(!result){
                console.log("incorrect password.")
                return cb(null, false, { message: 'Incorrect password.' });        
            }

            return cb(null, record);
            
        });

    }catch(err){
        console.error(err);
        return cb(err);
    }

}));

/*
router.post("/login", (req, res, next) => {
    
    passport.authenticate("local", function(err, user, info){
    
        if(err)
            return res.sendResult(null, 400, err);

        if(!user)
            return res.sendResult(null, 400, info);

        const loggedUser = {
            username: user.username,
            user_id: user.id,
            session_id: "q1w2e3"
        }
        
        console.log(`User '${user.username}' has logined.`);

        return res.sendResult(loggedUser, 200, "login success");
    })(req, res, next);
});
*/

router.post("/login", passport.authenticate("local",{failureRedirect:"/loginfail", failureMessage:true}),
    (req, res, next) => {
    
        console.log(req.session);
        console.log(`User '${req.user.username}' has logined.`);
        console.log(req.sessionID);

        return res.sendResult(req.user.username, 200, "login success");
    }
);

router.get("/loginfail", (req, res, next) => {
    console.log(req.session);
    console.log(req.sessionID);

    if(req.session.messages){
        const msg = req.session.messages[0];
        req.session.messages = [];
        return res.sendResult(null, 400, msg);
    }

    return res.sendResult(null, 400, "login fail. Please try again");
});


router.post("/register", async (req, res, next) => {

    const info = req.body;

     try{
        const record = await db.getUserRecordByName(info.username);

        if(record)
            return res.sendResult(null, 400, "Username has been used. Please user another name");

        bcrypt.hash(info.password, saltRounds, async function(err, hash){

            if(err){
                console.error(err);
                return res.sendResult(null, 500, "server has problem.");
            }

            info.password = hash;
            const result = await db.registerUserRecord(info);
            
            console.log(`User '${info.username}' has been registered.`);
            return res.sendResult(result, 200, "register success");
        });
        
    }catch(err){
        console.error(err);
        return res.sendResult(null, 500, "server has problem.");
    }
});


router.post("/logout", (req, res, next) => {
    if(!req.isAuthenticated())
        return res.sendResult(null, 200, "user has been logout");

    console.log(`session_id ${req.user.username} has logout.`)

    req.logout(function(err) {
        if (err) { return next(err); }

        console.log(req.session);
        return res.sendResult(null, 200, "logout success");
    });

});

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      session_id:"w2e3r4"
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

export default router;
