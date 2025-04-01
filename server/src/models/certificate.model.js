import { Schema,model } from "mongoose";

const CertificateSchema = new Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    image:{
        required:true,
        type:String
    },
    by:{
        required:true,
        type:String
    }
},{timestamps:true});

export const Certificate = model("Certificate",CertificateSchema);