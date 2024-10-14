import {errorResponse, successReponse} from "../utils/response.js";
import {userModel} from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {OAuth2Client} from "google-auth-library";
import {SignInMethod} from "../utils/integrations.js";


const saltRound=10;

const SECRET_KEY = process.env.SECRET_KEY;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const registerUser = async(req,res)=>{
    try{
        console.log("register user started");
        const body= {
            name:req.body.name,
            email: req.body.email,
            password:req.body.password,
            signInMethod: SignInMethod.LOCAL
        }

        const isUser = await userModel.findOne({email:body.email});
        if(isUser){
            throw new Error("User already registered.")
        }

        body.password = await bcrypt.hash(body.password, saltRound);
        await userModel.create(body);

        res.status(200).json(successReponse("user registered successfully"));

    }catch (error){
        res.status(400).json(errorResponse(error.toString()));
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const body = {
            name: "",
            email: req.body.email,
            password: req.body.password,
            signInMethod: SignInMethod.LOCAL,
        };

        const isUser = await userModel.findOne({ email: body.email });
        if (!isUser) {
            throw new Error("User not registered");
        }

        const isMatched = await bcrypt.compare(body.password, isUser.password);
        if (!isMatched) {
            throw new Error("Bad Credentials");
        }

        const payload = { email: body.email };
        const token = jwt.sign(payload, SECRET_KEY);

        res.status(200).json(successReponse(token));
    } catch (error) {
        // res.status(400).json(errorResponse(error.toString()));
        next(error);
    }
};

export const googleLogin = async(req,res)=>{
    try{
        const { idToken } = req.body;

        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: "613285431561-5m419bf7niu3fen55tus2eio4jugetqp.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();

            let tokenPayload = null;
            // Check if user already exists
            let user = await userModel.findOne({ email: payload.email });
            if (!user) {
                user = new userModel({
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture,
                    signInMethod: SignInMethod.GOOGLE
                });
                await user.save();
                tokenPayload={email:payload.email}
            }

            else{
                tokenPayload={email:user.email}
            }

            const token= jwt.sign(tokenPayload,SECRET_KEY);

            res.status(200).json(successReponse(token));

        } catch (error) {
            throw new Error(error.toString())
        }
    }catch(err){
        res.status(400).json(errorResponse(err.toString()));
    }
}