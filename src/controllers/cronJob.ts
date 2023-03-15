
import  USER  from '../models/User' // assuming your user model is defined in a file called `user.ts`
import cron from "node-cron";
import crypto from "crypto";
import sequelize from "sequelize";
import nodemailer from 'nodemailer';

async function expireOldPasswords() {
    const oldPasswords = await USER.findAll({
        where: {
            passwordLastChanged: {
                [sequelize.Op.lt]: new Date(Date.now() - 1 * 60 * 1000) // set expiration time to 1 hour for testing purposes
            }
        }
    });

    for (const user of oldPasswords) {
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

        const mailOptions = {
            from: process.env.USER,
            to: (user as any).email,
            subject: "Password Update Required",
            text: `Hello ${user.dataValues.firstName},\n\nYour password has expired and needs to be updated.\n\nPlease log in to your account and change your password.\n\nThank you,\nYour Company`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    }
}

//function to execute it
expireOldPasswords();


// cron.schedule("0 0 * * *", async () => {
//     const oldPasswords = await USER.findAll({
//         where: {
//             passwordLastChanged: {
//                 [sequelize.Op.lt]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
//             }
//         }
//     });

//     for (const user of oldPasswords) {
//         const tempPassword = crypto.randomBytes(20).toString("hex");

//         await USER.update({
//             password: tempPassword,
//             passwordLastChanged: new Date()
//         }, {
//             where: {
//                 id: (user as any).id
//             }
//         });

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             secure: true,
//             port: 587,
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.APPS_PASSWORD,
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         const mailOptions = {
//             from: process.env.USER,
//             to: (user as any).email,
//             subject: "Temporary Password",
//             text: `Hello ${user.dataValues.firstName as string},\n\nYour password has expired and we have generated a temporary password for you: ${tempPassword}\n\nPlease log in to your account and change your password.\n\nThank you,\nYour Company`,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(`Email sent: ${info.response}`);
//             }
//         });
//     }
// });
//The above code will run every day at midnight and check if any user has not changed their password in the last 180 days. If so, it will generate a random password for them and send them an email with the temporary password. The user will then be able to log in with the temporary password and change it to something more secure.
