import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

if(!DB_URI){
    throw new Error("DB URI not found");
}

export const connectToDB = async ()=>{
    try{
        console.log("Connecting to db....");
        await mongoose.connect(DB_URI);
        console.log("Connected to db successfully");
    }catch (error){
        throw new Error(error.toString());
    }
}

