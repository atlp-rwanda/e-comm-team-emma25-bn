import USER from "../models/User";
import { Request, Response } from "express"
import { Twilio } from "twilio";
const account_sid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const service_sid = process.env.TWILIO_SERVICE_SID;

import { config } from 'dotenv'
config()

/* this class hold functions for authentication */
/* eslint-disable @typescript-eslint/no-explicit-any */
class auth {
    static async signup(req: Request, res: Response) {
        //defined the type of user to be created 
        type newuser = {
            firstName: string,
            lastName: string,
            email: string,
            password: string,
        }
        const userReq: newuser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        }
        try {
            const user = await USER.create(userReq)
            if (user) {
                res.status(200).json({
                    statusCode: 200,
                    message: "created account succesfully"
                })
            }
            // else{
            //     res.status(400).json({
            //         statusCode: 200,
            //         message: "Failed to create user",                  
            //     })                    
            // }
        }
        catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: "Failed to create user",
                error: error.message
            })
        }

    }
    static async getAlluser(req: Request, res: Response) {
        try {
            const users: object = await USER.findAll({ attributes: { exclude: ['password'] } })
            res.status(200).json({
                statuscode: 200,
                users
            })
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                "message": error.message
            })
        }
    }
    /*this delete user function is not protected it is created just for the project setup and testing*/
    static async deleteUser(req: Request, res: Response) {
        const userid: string = req.params.id
        try {
            await USER.destroy({ where: { id: userid } })
            res.status(200).json({
                statusCode: 200,
                "message": `deleted user with id ${userid}`
            })

        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                "message": error.message
            })


        }
    }

    static sendCode(req: Request, res: Response) {
        const userPhone: string = req.params.phone;
        if (account_sid && authToken && service_sid) {
            const Client = new Twilio(account_sid, authToken);
            Client.verify.v2.services(service_sid)
                .verifications
                .create({ to: userPhone, channel: 'sms' })
                .then(resp => {
                    res.status(200).json({message: "Success sent", resp})
                })
                .catch(err => {
                    res.status(400).json(err)
                })
        } else {
            console.log('Please fill all vals')
        }
    }
    static verify2FA(req: Request, res:Response) {
        const userPhone: string = req.params.phone;
        const userCode: string = req.params.code;
        if (account_sid && authToken && service_sid) {
            const Client = new Twilio(account_sid, authToken);
            Client.verify.v2.services(service_sid)
                .verificationChecks
                .create({ to: userPhone, code: userCode })
                .then(resp => {
                    res.status(200).json({message: "Success sent", resp})
                })
                .catch(err => {
                    res.status(400).json(err)
                })
        } else {
            console.log('Please fill all vals')
        }
    }
}
export default auth