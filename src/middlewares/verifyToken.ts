import { Request,Response,NextFunction } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { any, string } from 'joi';
dotenv.config();

const verifyToken=async(req:Request, res:Response, next:NextFunction)=>{
try {

  const token=req.headers['authorization'] as string
  const auth = token.split(" ")[1]
  // const token=authHeader && authHeader.split('')[1]
  if (!auth) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(auth, process.env.JWT_SECRET as string);
      // req.user = decoded;
    } catch (err) {
     
        console.log(err)
    }
    return next();
  
} catch (error) {
  return res.status(403).send("Token not provided");
  
}
 

}

export default verifyToken;