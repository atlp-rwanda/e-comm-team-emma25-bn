
import { Request, Response } from "express";
import { Twilio } from "twilio";
import { encode } from "../helper/jwtTokenize";

import { config } from "dotenv";
import bcrypt from "bcrypt";
import PROFILE from "../models/profilemodels/profile";
import ROLE from "../db/models/Role.model";
import { foundUser } from "../helper/authHelpers";
import USER from '../models/User'
import Cart from '../db/models/cart'

config();
const account_sid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const service_sid = process.env.TWILIO_SERVICE_SID;

class auth {
    /* Start: 2FA Feature for sellers */
    // Sending an OTP to user provided phone number
    static sendCode(req: Request, res: Response) {
        const userPhone: string = req.params.phone;
        if (account_sid && authToken && service_sid) {
            const Client = new Twilio(account_sid, authToken);
            Client.verify.v2
                .services(service_sid)
                .verifications.create({ to: userPhone, channel: "sms" })
                .then((resp) => {
                    res.status(200).json({
                        status: 200,
                        message: "Verification sent successfully!",
                        codeSentTo: resp.to,
                        verificationStatus: resp.status,
                    });
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        } else {
            res.status(400).json({
                status: 400,
                message: "Twilio Credentials are not found!",
            });
        }
    }

    // Verify user provided OTP if its the one we sent to him/her
    static verify2FA(req: Request, res: Response) {
        const userPhone: string = req.params.phone;
        const userCode: string = req.params.code;
        if (account_sid && authToken && service_sid) {
            const Client = new Twilio(account_sid, authToken);
            Client.verify.v2
                .services(service_sid)
                .verificationChecks.create({ to: userPhone, code: userCode })
                .then((resp) => {
                    res.status(200).json({
                        status: 200,
                        message: "You are verified!",
                        verificationStatus: resp.status,
                        codeValidity: resp.valid,
                    });
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        } else {
            res.status(400).json({
                status: 400,
                message: "Twilio Credentials are not found!",
            });
        }
    }
    /* End: 2FA Feature for sellers */
    static async logout(req: Request, res: Response) {
        try {
            // Clear cookies
            res.clearCookie("jwt");
            res.clearCookie("token");
            res.cookie("token", "", { httpOnly: true, maxAge: 0 });

            // Set authorization header to empty
            res.setHeader("Authorization", "");

            // Send success response
            res.status(200).json({ status: 200, message: "Logged out" });
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message,
            });
        }
    }

    static async signup(req: Request, res: Response) {
        
        try {
            // await USER.drop()
            const { firstName, lastName, email, password } = req.body;
            const checkUser = await USER.findOne({
                where: { email: email },
            });

            if (checkUser) {
                return res.status(400).json({
                    status: 400,
                    message: "User is already SignUp",
                });
            } else {
                const createData: any = await USER.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId: 2,
                });
                if (createData) {
                    const profiledata = {
                        firstName: createData.firstName,
                        lastName: createData.lastName,
                        email: createData.email,
                        userId: createData.id,
                    };
                    await PROFILE.create({ ...profiledata });
                   await Cart.create({buyerId: createData.id, total: 0})
                }
                // GET ROLE FROM THE ROLEID FOREIGN KEY
                const role = await createData.getRole();
                res.status(200).json({
                    status: 200,
                    message: "account created successfully",
                    createData,
                    token: encode({
                        id: createData.id,
                        email: createData.email,
                        role: role.name,
                    }), //changed the token to keep same fields as login
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: { error },
            });
        }
    }
    // LOGIN

    static async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const findUser = await USER.findOne({
                where: { email: email },
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "roleId",
                    "password",
                ],
            });
            if (!findUser) {
                res.status(404).json({ message: "User not found" });
            } else {
                const dbPassword = findUser.dataValues.password;
                const decreptedPassword = await bcrypt.compare(
                    password,
                    dbPassword
                );
                // GET ROLE FROM FOREIGN KEY
                const logginUser: any = findUser;
                const role = await logginUser.getRole();
                if (decreptedPassword) {
                    const token = encode({
                        id: findUser.dataValues.id,
                        email: findUser.dataValues.email,
                        role: role.name,
                    });
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    });
                    res.status(200).json({
                        stastus: 200,
                        message: "Login succefull ",
                        token: token,
                    });
                } else {
                    res.status(400).json({
                        stastus: 400,
                        message: "Wrong password",
                    });
                }
            }
        } catch (error: any) {
            res.status(500).json({
                stastus: 500,
                message: "server problem " + error.message,
            });
        }
    }

    //UPDATE PASSWORD

    static async updatePassword(req: Request, res: Response) {
        try {
            // Check if user is authenticated and retrieve user ID from token
            // if (!req.user || !req.user.id) {
            //     return res.status(401).json({
            //         status: 401,
            //         message: "User not authenticated.",
            //     });
            // }
            const { email, oldPassword, newPassword, confirmPassword } =
                req.body;

            // Input validation
            if (!email || !oldPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({
                    status: 400,
                    message: "Missing required fields",
                });
            }

            const userFound = await foundUser(email);
            if (!userFound) {
                return res
                    .status(404)
                    .json({ status: 404, message: "User not found" });
            }

            // Check if current password is correct
            const databasePassword = (userFound as any).password;
            const isValidPassword = await bcrypt.compare(
                oldPassword,
                databasePassword
            );
            if (!isValidPassword) {
                return res.status(400).json({
                    status: 400,
                    message: "Incorrect current password.",
                });
            }
            // Check if new password matches confirmation
            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    status: 400,
                    message: "New password does not match confirmation.",
                });
            }
            const id = (userFound as any).id;
            const updatePassword = await USER.update(
                { password: newPassword },
                { where: { id: id } }
            );

            if (updatePassword) {
                return res.status(200).json({
                    status: 200,
                    message: "Password changed successfully",
                });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: "Server error, password not updated",
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: "Server error: " + error.message,
            });
        }
    }

    static async getAlluser(req: Request, res: Response) {
        try {
            const users: object = await USER.findAll({
                attributes: { exclude: ["password"] },
                include: ROLE,
            });
            res.status(200).json({
                statuscode: 200,
                users,
            });
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message,
            });
        }
    }
    /*this delete user function is not protected it is created just for the project setup and testing*/
    static async deleteUser(req: Request, res: Response) {
        const userid: string = req.params.id;
        try {
            await USER.destroy({ where: { id: userid } });
            res.status(200).json({
                statusCode: 200,
                message: `deleted user with id ${userid}`,
            });
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message,
            });
        }
    }


}
export default auth;
