import {model, Schema} from "mongoose";
import {Integrations, SignInMethod} from "../utils/integrations.js";

const userSchema = new Schema({
    name:{type:String,require:true},
    email:{type:String, require:true},
    password:{type:String},
    createdAt:{
        type:String,
        default: () => new Date().toISOString()
    },
    updatedAt:{
        type:String,
        default: () => new Date().toISOString()
    },
    picture:{type:String,default:""},
    signInMethod:{
            type: String,
            enum: Object.values(SignInMethod),
            required: true
    }
})

export const userModel= model("User",userSchema);




