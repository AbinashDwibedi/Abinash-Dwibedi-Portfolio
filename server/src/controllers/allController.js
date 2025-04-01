import { User } from "../models/User.model.js";
import { Certificate } from "../models/certificate.model.js";
import { Project } from "../models/project.model.js";
import { TechStack } from "../models/techstack.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import bcrypt from "bcrypt";
import path from "path";

async function generateAccesstokenRefreshToken(userId) {
    const user = await User.findById(userId);
    const accesstoken =await user.generateAccesstoken();
    const refreshtoken =await user.generateRefreshtoken();
    return {accesstoken,refreshtoken};
}

export const login = AsyncHandler(async (req,res)=>{
    const {userName,password,petName} = req.body;
    if(!userName | !password | !petName){
        throw new ApiError(400,"Invalid Input");
    }
    let user = await User.findOne({userName});
    if(!user){
        throw new ApiError(404,"User not found");
    }
    else{
        let htmlOptions = {
            htmlOnly:true,
            secure:true,
            sameSite:"None"
        }
        const checkPassword = bcrypt.compareSync(password,user.password);
        const checkPetName = bcrypt.compareSync(petName,user.petName);
        if(checkPassword && checkPetName){
            const {accesstoken,refreshtoken} = await generateAccesstokenRefreshToken(user._id);
            res.cookie("refreshtoken",refreshtoken,htmlOptions).cookie("accesstoken",accesstoken,htmlOptions).status(200).json(new ApiResponse(null));
        }
        else{
            throw new ApiError(401,"Invalid Credentials");
        }
    }
})

export const addTechstack = AsyncHandler(async (req,res)=>{
    const {known,name,color} = req.body;
    const {_id} = req.user;
    
    if(!known | !name | !color){
        throw new ApiError(400,"Invalid Input");
    }
    let user = await User.findById(_id);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    else{
        let techstack = new TechStack({
            known,
            name,
            color
        })
        await techstack.save();
        user.techStacks.push(techstack._id);
        await user.save();
        res.status(200).json(new ApiResponse(null));
    }
})

export const addProject = AsyncHandler(async (req,res)=>{
    const {name,description,link} = req.body;
    if(!name | !description | !link){
        throw new ApiError(400,"Invalid Input")
    }
    const image = req.files.image[0].path;
    if(req.files.image.length === 0){
        throw new ApiError(400,"Invalid Input")
    }
    const {_id} = req.user;
    let user = await User.findById(_id);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    else{
        let response = await uploadOnCloudinary(path.resolve(image))
        const imageLink = response.secure_url;
        let project = new Project({
            name,description,link,image:imageLink
        })
        await project.save();
        user.projects.push(project._id)
        await user.save();
        res.status(200).json(new ApiResponse(null));
    }
})

export const addCertificate = AsyncHandler(async(req,res)=>{
    const {title,description,by} = req.body;
    if(!title | !description | !by){
        throw new ApiError(400,"Invalid Input")
    }
    const image = req.files.image[0].path;
    if(req.files.image.length === 0){
        throw new ApiError(400,"Invalid Input")
    }
    const {_id} = req.user;
    let user = await User.findById(_id);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    else{
        let response = await uploadOnCloudinary(path.resolve(image))
        const imageLink = response.secure_url;
        let certificate = new Certificate({
            title,description,by,image:imageLink
        })
        await certificate.save();
        user.certificates.push(certificate._id)
        await user.save();
        res.status(200).json(new ApiResponse(null));
    }
})

