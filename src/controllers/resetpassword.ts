import nodemailer from "nodemailer"
import { config } from "dotenv"
config()
/* eslint-disable @typescript-eslint/no-explicit-any */ 

const sendEmail= async(email: string ,subject: string  ,text: any)=>{
    try {
        const transporter = nodemailer.createTransport({    
            service: 'gmail',       
            secure: true,           
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                clientId: process.env.NODEMAILER_CLIENT_ID,
                clientSecret: process.env.MODEMAILER_CLIENT_SECRET,
                refreshToken: process.env.MAILER_REFRESH_ACCESSTOKEN                   
                
          },
          tls: {
            rejectUnauthorized: false
        }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        })           
    } catch (error: any ) {
       throw new error(error.message)    
    }
}

export default sendEmail