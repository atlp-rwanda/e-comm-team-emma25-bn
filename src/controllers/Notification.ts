import { Notification } from "../db/models/notifications";

import { Request, Response } from "express";

export async function getyournotifications(req:Request ,res: Response){
    const user:any = req.user
    try {
        const notifications = await Notification.findAll({where: {userId: user.id}}) 

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            notifications,
        })
        
    } catch (error: any) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
        
    }
}

// export async function notifyme(buyer: number, seller: number, subject:string , message: string){
    

// }