import sendEmail from "./resetpassword";
import USER from "../models/User";
import Tokens from "../models/token";
import crypto from "crypto"
import { Request , Response } from "express";
import joi from "joi"

/* eslint-disable @typescript-eslint/no-explicit-any */

class resetpass{
    static async sendlink(req:Request ,res: Response){
        try{
        const schema = joi.object({email: joi.string().email().required()})   
        const {error}= schema.validate(req.body);
        if(error){
            res.status(400).json({
                statuCode: 400,
                message: error.details[0].message
            })
        }     
        else {
            // type usertype={
            //     id: string,
            //     email: string,
            // }
            const usertochange: any = await USER.findOne({where: {email: req.body.email},
                attributes: ["id", "email"]})
            if(!usertochange){
                res.status(400).json({
                    statusCode: 400,
                    message: "User not found."
                })
            }
            else {                             
                let token: any = await Tokens.findOne({where :{userId : `${usertochange.id}`}})
                if(!token){
                   token = await Tokens.create({
                        userId: usertochange.id,
                        token: crypto.randomBytes(6).toString("hex")
                    })                    
                } 
                const link= `${token.token}`
             await sendEmail(usertochange.email, "Reset Password", link).then()
             res.status(200).json({
                statusCode: 200,
                message: "checkyour email for password verification"
             })
             
            }
        }}
        catch(error: any){
            res.status(400).json({
                statuCode: 200,
                message: error.message
            })
        }
    }
    static async changepassword(req: Request, res:Response){
        try {
            const useremail= req.params.useremail
            const user:any = await USER.findOne({where: {email: useremail }})  
            const userId =  `${user.id}`
            const passtoken = `${req.params.token}`
            const newpassword = req.body.newpassword 
            const confirmpass = req.body.confirmpass            
            
             const findtoken:any = await Tokens.findOne({where: {
                userId: userId,
                token: passtoken,
             }})
             
             if(findtoken){
                if (newpassword==confirmpass){
               const editeduser = await USER.update({password: newpassword},{where: {id: userId}})               
               if(editeduser){              
                await Tokens.destroy({where: {id: findtoken.id}}) 
                res.status(200).json({
                    statusCode: 200,
                    message: "passsword has been reset succesfully"

                })
               }

                }
                else{
                    res.status(400).json({
                        statusCode: 400,
                        message: "the passwords should match"
                    })
                }
             }
             else{
                res.status(400).json({
                    statusCode: 200,
                    message: "token not found" 
                })
             }
            

        } catch (error: any) {
            console.log(error)
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })
            
        }
    }  
    

}


export default resetpass