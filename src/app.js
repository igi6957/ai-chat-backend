import dotenv from "dotenv";
dotenv.config();

import {connectToDB} from "./db.js";
import authRouter from "./routes/authRoute.js";
import express from "express";
import cors from "cors";
import {errorResponse} from "./utils/response.js";

const PORT = process.env.PORT?process.env.PORT:5000;
const BASE_URL = process.env.BASE_URL;

const app = express();

app.use(cors({
    origin: "*",
}));



app.use(express.json());

app.use(BASE_URL+"/user",authRouter);



app.listen(PORT,async ()=>{
    await connectToDB();
    console.log("Server started on port ",PORT);
})

app.use((err, req, res, next) => {
    const status = err.statusCode?err.statusCode:400;
    res.status(status).json(errorResponse(err.toString()));
});