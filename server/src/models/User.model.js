import { Schema,model } from "mongoose";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const UserSchema = new Schema({
    userName:{
        required:true,
        type:String,
        unique:true,
        index:true,
        toLowerCase:true
    },
    password:{
        required:true,
        type:String,
    },
    petName:{
        required:true,
        type:String,
    },
    certificates:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Certificate"
    },
    projects:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Project"
    },
    techStacks:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"TechStack"
    }
    
},{timestamps:true});

UserSchema.methods.generateAccesstoken = function(){
    const user = this;
    const accesstoken = jwt.sign(
        {userName:user.userName,_id:user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
    return accesstoken;
}
UserSchema.methods.generateRefreshtoken = function(){
    const user = this;
    const refreshtoken = jwt.sign(
        {userName:user.userName,_id:user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
    return refreshtoken;
}
export const User = model("User",UserSchema);