import USER from "../models/User";
import {Request , Response} from "express"

class auth {
    static async signup(req: Request ,res:Response){
        //defined the type of user to be created 
        type newuser ={
            firstName: string,
            lastName : string,
            email: string,
            password: string,
        }
const userReq: newuser ={
    firstName: req.body.firstName ,
    lastName: req.body.lastName ,
    email:req.body.email ,
    password:req.body.password ,

}
        try {
            const user = await USER.create(userReq)
            if(user){
                res.status(200).json({
                    statusCode: 200,
                    message: "created account succesfully"
                })              
            }
            else{
                res.status(400).json({
                    statusCode: 200,
                    message: "Failed to create user",                  
                })                    
            }
        } catch (error: any) {
            res.status(400).json({
                statusCode: 200,
                message: "Failed to create user",
                error: error.message                  
            })            
        }

    }
}