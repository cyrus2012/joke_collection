import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import testStorage from "./storage/testStorage.js";
import authRouter from "./route/auth.js";
import session from "express-session";
import config from "config";
import passport from "passport";

const sessionConfig = config.get("session_config");

const app = express();
const PORT = 6500;

app.use(cors({
    origin:true,
    credentials:true
}));

//app.use(cors());

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());

app.use(session({
    secret: sessionConfig.get("secret"),
    resave: false,
    saveUninitialized: false
    
}));

//app.use(passport.initialize());
//app.use(passport.session()); //passport does not put failure/success message into session if use this method.
app.use(passport.authenticate('session'));



app.use((req, res, next) => {
    res.sendResult = (data, statusCode, message) => {
        return res.json({
            data:data,
            status:{
                code:statusCode,
                message: message
            }
        });
    }

    next();
});


//for connection test
app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    res.sendResult("in home page.", 200, "success");
});


app.use("/", authRouter);

app.get("/savedjokes", (req, res, next) => {
    console.log(req.session);
    console.log(req.sessionID);

    if(!req.isAuthenticated())
        return res.sendResult(null, 400, "Please sign in account first.");

    return res.sendResult("YOu get the list", 200, "success");
    
});


//return error for invalid route
app.use("/{*splat}", (req, res, next) => {
    return res.sendResult(null, 404, "no api found");
});



app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});