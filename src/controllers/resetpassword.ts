import nodemailer from "nodemailer"
import { config } from "dotenv"
config()

const sendEmail= async(email: string ,subject: string  ,text: string )=>{
    try {
        const transporter = nodemailer.createTransport({            
            service: 'gmail',       
            secure: true,
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,      
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
        console.log("email sent")        
    } catch (error) {
        console.log(error)        
    }
}

export default sendEmail