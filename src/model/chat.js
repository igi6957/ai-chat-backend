import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt:{
        type:String,
        default: () => new Date().toISOString()
    },
    updatedAt:{
        type:String,
        default: () => new Date().toISOString()
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

export const chatModel = model("Chat", chatSchema);


