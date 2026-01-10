import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 6500;

app.use(cors());
app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());

const user = {
    username: "Tom",
    password: "abc"
}

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

app.post("/login", (req, res) => {
    if(req.body.username != user.username)
        return res.sendResult(null, 400, "user does not exist");
    if(req.body.password != user.password )
        return res.sendResult(null, 400, "incorrect password");

    return res.sendResult(user.username, 200, "login success");
});


app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});