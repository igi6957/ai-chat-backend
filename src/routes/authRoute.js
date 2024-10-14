import express from "express";
import {googleLogin, loginUser, registerUser} from "../controller/userController.js";

const authRouter = express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);

authRouter.post("/google",googleLogin);

export default authRouter;
