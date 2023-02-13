import USER from '../models/User'

import { Request, Response } from 'express'
import { Twilio } from 'twilio'
import {  encode  } from '../helper/jwtTokenize'
import bcrypt from 'bcrypt'

import { config } from 'dotenv'
import session from 'express-session'
import connectRedis from 'connect-redis'
import {createClient} from 'redis'
import Redis from 'ioredis'

const RedisStore = connectRedis(session)
import { object } from 'joi'
config()

const account_sid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const service_sid = process.env.TWILIO_SERVICE_SID

/* this class hold functions for authentication */
/* eslint-disable @typescript-eslint/no-explicit-any */
class auth {
  /* Start: 2FA Feature for sellers */
  // Sending an OTP to user provided phone number
  static sendCode(req: Request, res: Response) {
    const userPhone: string = req.params.phone
    if (account_sid && authToken && service_sid) {
      const Client = new Twilio(account_sid, authToken)
      Client.verify.v2
        .services(service_sid)
        .verifications.create({ to: userPhone, channel: 'sms' })
        .then((resp) => {
          res.status(200).json({status: 200, message: 'Verification sent successfully!', codeSentTo: resp.to, verificationStatus: resp.status})
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    } else {
      console.log('Please fill all vals')
    }
  }

  // Verify user provided OTP if its the one we sent to him/her
  static verify2FA(req: Request, res: Response) {
    const userPhone: string = req.params.phone
    const userCode: string = req.params.code
    if (account_sid && authToken && service_sid) {
      const Client = new Twilio(account_sid, authToken)
      Client.verify.v2
        .services(service_sid)
        .verificationChecks.create({ to: userPhone, code: userCode })
        .then((resp) => {
          res.status(200).json({status: 200, message: 'You are verified!', verificationStatus: resp.status, codeValidity: resp.valid})
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    } else {
      console.log('Please fill all vals')
    }
  }
  /* End: 2FA Feature for sellers */

  static async logout(req: Request, res: Response) {
    try {
      res.cookie('jwt', '', {httpOnly: true, maxAge: 1000})
      res.status(200).json({status: 200, message: 'Logged out'})
    } catch (error: any) {
      res.status(400).json({
        statusCode: 400,
        message: error.message,
      })
    }
  }
  static async signup(req: Request, res: Response) {
    try {
      // await USER.drop()
      const { firstName, lastName, email, role, password } = req.body
      //   const hash = await bcrypt.hashSync(password, 10)
      const checkUser = await USER.findOne({
        where: { email: email },
      })
      if (checkUser) {
        return res.status(400).json({
          status: 400,
          message: 'User is already SignUp',
        })
      } else {
        type userType = {
          id: string
          firstName: string
          lastName: string
          email: string
          password: string
        }

        const createData: any = await USER.create({
          firstName,
          lastName,
          email,
          role: 'User',
          password,
        })
        const user = await USER.findOne({
          where: { email: email },
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
        })
        res.status(200).json({
          status: 200,
          message: 'account created successfully',
          token: encode({ id: createData.id, email: createData.email }),
        })
      }
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        message: 'Server error :' + error.message,
      })
    }
  }
  // LOGIN

  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const findUser = await USER.findOne({
        where: { email: email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'password'],
      })
      if (!findUser) {
        res.status(404).json({ message: "User not found" })
      } else {
        const dbPassword = findUser.dataValues.password
        const decreptedPassword = await bcrypt.compare(password, dbPassword)
        // console.log(decreptedPassword)
        if (decreptedPassword) {
          res.status(200).json({
            stastus: 200,
            message: 'Login succefull ',
            data: findUser,
            token: encode({ id: findUser.dataValues.id, email: findUser.dataValues.email, role: findUser.dataValues.role })
          })
        } else {
          res.status(400).json({
            stastus: 400,
            message: 'Wrong password',
          })  
        }
      }

    } catch (error: any) {
      res.status(500).json({
        stastus: 500,
        message: 'server problem' + error.message,
      })
    }
  }


  static async getAlluser(req: Request, res: Response) {
    try {
      const users: object = await USER.findAll({
        attributes: { exclude: ['password'] },
      })
      res.status(200).json({
        statuscode: 200,
        users,
      })
    } catch (error: any) {
      res.status(400).json({
        statusCode: 400,
        message: error.message,
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
        message: `deleted user with id ${userid}`,
      })
    } catch (error: any) {
      res.status(400).json({
        statusCode: 400,
        message: error.message,
      })
    }
  }

  static async authorize(req: Request, res: Response) {
    const {email, role} = req.body
    try {
      const user = await USER.findOne({where: {email}})
      if (!user) {
        return res
          .status(404)
          .json({error: `User with email ${email} not found`})
      }
      await user.update({role})
      return res
        .status(200)
        .json({message: `User with email ${email} is update to ${role} role`})
    } catch (error) {
      console.error(error)
      return res.status(500).json({error: 'Server error'})
    }
  }
}
export default auth
