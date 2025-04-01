import { User } from "../models/User.model.js";
import { Project } from "../models/project.model.js";
import { Certificate } from "../models/certificate.model.js";
import { TechStack } from "../models/techstack.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const retriveProjects = AsyncHandler(async(req,res)=>{
    const userId = process.env.userId
    const projects = await User.findById(userId).populate("projects").select("+projects -_id");
    if(!projects){
        throw new ApiError(404,"not found");
    }
    else{
        res.status(200).json(new ApiResponse(projects.projects));
    }
})

export const retriveCertificates = AsyncHandler(async(req,res)=>{
    const userId = process.env.userId
    const certificates = await User.findById(userId).populate("certificates").select("+certificates -_id");
    if(!certificates){
        throw new ApiError(404,"not found");
    }
    else{
        res.status(200).json(new ApiResponse(certificates.certificates));
    }
})
export const retriveTechStacks = AsyncHandler(async(req,res)=>{
    const userId = process.env.userId
    const techStacks = await User.findById(userId).populate("techStacks").select("+techStacks -_id");
    if(!techStacks){
        throw new ApiError(404,"not found");
    }
    else{
        res.status(200).json(new ApiResponse(techStacks.techStacks));
    }
})