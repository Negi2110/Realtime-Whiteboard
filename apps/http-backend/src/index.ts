import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateRoomSchema, CreateUserSchema,SigninSchema} from "@repo/common/types"

const app=express();

app.post("/signup",(req,res)=>{
    const data=CreateUserSchema.safeParse(req.body);
    if(!data){
        return res.json({
            message:"incorrect inputs"
        })
    }
    res.json({
        userId:"123"
    })
    
})
app.post("/signin",(req,res)=>{
    const data=SigninSchema.safeParse(req.body);
    if(!data){
        return res.json({
            message:"incorrect inputs"
        })
    }
    

    const userId=1;
    const token=jwt.sign({
        userId
    },JWT_SECRET)
    res.json({
        token
    })
})
app.post("/room",middleware,(req,res)=>{
    //
    const data=CreateRoomSchema.safeParse(req.body);
    if(!data){
        return res.json({
            message:"incorrect inputs"
        })
    }

    res.json({
        roomId:123
    })

})
app.use(express.json());

app.listen(3001);