import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://abinash-dwibedi.web.app",
    credentials:true
}))
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


import bcrypt from "bcrypt"
import { User } from "./models/User.model.js";
// async function createUser() {
//     // const user = await User.create({
//     //     userName:"",
//     //     password:bcrypt.hashSync("",10),
//     //     petName:bcrypt.hashSync("",10)
//     // })
//     // console.log(user);
//     const user = await User.find()
//     console.log(user)
// }
// createUser()
app.get("/",(req,res)=>{
    // res.sendFile(path.resolve("public/pages/login.html"));
    res.send("hello world")
})
app.get("/home",(req,res)=>{
    res.sendFile(path.resolve("public/pages/home.html"));
})
app.get("/updateTechStack",(req,res)=>{
    res.sendFile(path.resolve("public/pages/techStackForm.html"));
})
app.get("/updateProject",(req,res)=>{
    res.sendFile(path.resolve("public/pages/projectForm.html"));
})
app.get("/updateCertificate",(req,res)=>{
    res.sendFile(path.resolve("public/pages/certificateForm.html"));
})

import allRoutes from "./routes/allRoutes.js";
import retriveRoutes from "./routes/retriveRoutes.js"
app.use("/api/add",allRoutes);
app.use("/api/retrive",retriveRoutes);
