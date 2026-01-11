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

//for connection test
app.get("/", (req, res) => {
    res.sendResult("in home page.", 200, "success");
});


app.use("/", authRouter);


//return error for invalid route
app.use("/{*splat}", (req, res, next) => {
    return res.sendResult(null, 404, "no api found");
});



app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});