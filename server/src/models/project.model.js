import { Schema,model } from "mongoose";

const ProjectSchema = new Schema({
    name:{
        required:true,
        type:String,
        index:true
    },
    description:{
        required:true,
        type:String,
    },
    link:{
        required:true,
        type:String,
    },
    image:{
        required:true,
        type:String,
    }
},{timestamps:true})
export const Project = model("Project",ProjectSchema);