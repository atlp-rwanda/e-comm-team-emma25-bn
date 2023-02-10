import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const encode = (claims:any)=>{
    const token= jwt.sign(claims, process.env.JWT_SECRET as string, { expiresIn: "7d"});
    return token;
};

export const decode=(token:string)=>{
    const payload=jwt.verify(token, process.env.JWT_SECRET as string) 
    return payload;
}