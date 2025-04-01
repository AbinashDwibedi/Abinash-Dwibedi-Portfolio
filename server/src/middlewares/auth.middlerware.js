import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";

export const verifyJWT = async(req,res,next)=>{
    try {
        const token = req.cookies?.accesstoken;
        if(!token){
            return res.status(401).json(new ApiResponse(401,"access token not found",{}))
        }
        
        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("userName _id");

        if(!user){
            return res.status(401).json(new ApiResponse(401,"Invalid Access Token",{}))
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json(new ApiResponse(401,"Invalid Access Token",{}))
    }
}