import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import testStorage from "./storage/testStorage.js";
import authRouter from "./route/auth.js";

const app = express();
const PORT = 6500;

app.use(cors());
app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());


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

app.get("/", (req, res) => {
    res.sendResult("in home page.", 200, "success");
});


app.use("/", authRouter);

app.use("/{*splat}", (req, res, next) => {
    return res.sendResult(null, 404, "no api found");
});

/* 
app.post("/login", (req, res) => {
    const user = testStorage.getUserRecordByName(req.body.username);

    if(!user)
        return res.sendResult(null, 400, "user does not exist");

    if(req.body.password != user.password )
        return res.sendResult(null, 400, "incorrect password");

    const reply = {
        id: user.id,
        username: user.username,
        sessionId: "wd323d"
    }

    return res.sendResult(reply, 200, "login success");
}); 
*/




app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});