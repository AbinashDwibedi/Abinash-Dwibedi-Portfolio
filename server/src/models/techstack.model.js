import { Schema,model } from "mongoose";

const TechStackSchema = new Schema({
    known: {
        required:true,
        type:String
    },
      name: {
        required:true,
        type:String
      },
      color: {
        required:true,
        type:String
      }
},{timestamps:true});

export const TechStack = model("TechStack",TechStackSchema);
