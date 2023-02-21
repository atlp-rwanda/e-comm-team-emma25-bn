import sendgrid from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.SENDGRID_API_KEY)
sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

// interface message_body {
//   err: string;
//   info: string;
// }

const sendEmail = async (message_body) => {
  console.log(message_body)
  try {
    const result = await sendgrid.send(message_body)
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    )
    console.log(result)
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    )
    return result
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

export default sendEmail
