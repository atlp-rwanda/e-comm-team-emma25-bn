// import sendgrid from '@sendgrid/mail'
// import dotenv from 'dotenv'

// dotenv.config()
// console.log(process.env.SENDGRID_API_KEY)
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

// interface message_body {
//   err: string;
//   info: string;
// }

// const sendEmail = async (message_body) => {
//   console.log(message_body)
//   try {
//     const result = await sendgrid.send(message_body)
//     console.log(
//       '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
//     )
//     console.log(result)
//     console.log(
//       '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
//     )
//     return result
//   } catch (error) {
//     console.log('error')
//     console.log(error)
//   }
// }

// export default sendEmail


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
        // type: 'OAuth2',
        user: process.env.USER,
        pass: process.env.PASS,
        // clientId: process.env.OAUTH_CLIENTID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        // refreshToken: process.env.OAUTH_REFRESH_TOKEN
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    })
    console.log('email sent')
  } catch (error) {
    console.log(error)
  }
}

export default sendEmail