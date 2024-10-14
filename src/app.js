import * as dotenv from "dotenv";

import {connectToDB} from "./db";
import authRouter from "./routes/authRoute";
import express from "express";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT?process.env.PORT:5000;
const BASE_URL = process.env.BASE_URL;

const app = express();

app.use(cors({
    origin: "*",
}));

app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: err.toString() });
});

app.use(express.json());

app.use(BASE_URL+"/user",authRouter);

app.listen(PORT,async ()=>{
    await connectToDB();
    console.log("Server started on port ",PORT);
})