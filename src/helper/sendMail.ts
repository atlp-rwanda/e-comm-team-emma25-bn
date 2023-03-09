
import nodemailer from 'nodemailer'
import {config} from 'dotenv'
config()

const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.APPS_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
   return await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    })
  } catch (error) {
    return error;
  }

}

export default sendEmail