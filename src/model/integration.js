import {model, Schema} from "mongoose";
import {Integrations} from "../utils/integrations.js";

const sessionSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });

const integrationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(Integrations),
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    session:sessionSchema,
    createdAt:{
        type:String,
        default: () => new Date().toISOString()
    },
    updatedAt:{
        type:String,
        default: () => new Date().toISOString()
    }
})

export const integrationModel = model("Integration",integrationSchema);