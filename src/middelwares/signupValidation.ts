import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const signupValidation =(req:Request, res:Response, next:NextFunction)=>{
        
    const Schemas = Joi.object().keys({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(8).required(),
    })
    const {error} = Schemas.validate(req.body)
    if(error){
        return res.status(400).json({
            status:400,
            error:error.details[0].message
        });
    }
    next()

}

export default signupValidation