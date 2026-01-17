import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import testStorage from "./storage/testStorage.js";
import authRouter from "./route/auth.js";
import jokeRouter from "./route/joke.js";
import session from "express-session";
import config from "config";
import passport from "passport";
import statusCode from "./config/statusCode.js";

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


//To format response data format.
app.use((req, res, next) => {
    res.sendResult = (data, statusCode, message) => {
        return res.json({
            data:data,
            statusCode:statusCode,
            message: message
        });
    }

    next();
});


//for connection test
app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    res.sendResult("in home page.", statusCode.success, "success");
});


app.use("/", authRouter);
app.use("/", jokeRouter);



//return error for invalid route
app.use("/{*splat}", (req, res, next) => {
    return res.sendResult(null, statusCode.notFound, "no api found");
});



app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});