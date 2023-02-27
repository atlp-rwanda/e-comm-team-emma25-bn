// import USER from '../models/User'
import USER from '../db/models/User'
import ROLE from '../db/models/Role'
// import ROLE from ''

import {Request, Response} from 'express'
import {Twilio} from 'twilio'
import {encode} from '../helper/jwtTokenize'

import {config} from 'dotenv'
import session from 'express-session'
import connectRedis from 'connect-redis'
import {createClient} from 'redis'
import Redis from 'ioredis'
import bcrypt from 'bcrypt'

const RedisStore = connectRedis(session)
import {object} from 'joi'
import PROFILE from '../models/profilemodels/profile'
import ADDRESS from '../models/profilemodels/Address'
import BILLINGADDRESS from '../models/profilemodels/BillingAdress'
config()

const account_sid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const service_sid = process.env.TWILIO_SERVICE_SID

/* this class hold functions f
or authentication */
/* eslint-disable @typescript-eslint/no-explicit-any */
class auth {
  static sendCode(req: Request, res: Response) {
    const userPhone: string = req.params.phone
    if (account_sid && authToken && service_sid) {
      const Client = new Twilio(account_sid, authToken)
      Client.verify.v2
        .services(service_sid)
        .verifications.create({to: userPhone, channel: 'sms'})
        .then((resp) => {
          res.status(200).json({message: 'Success sent', resp})
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    } else {
      console.log('Please fill all vals')
    }
  }
  static verify2FA(req: Request, res: Response) {
    const userPhone: string = req.params.phone
    const userCode: string = req.params.code
    if (account_sid && authToken && service_sid) {
      const Client = new Twilio(account_sid, authToken)
      Client.verify.v2
        .services(service_sid)
        .verificationChecks.create({to: userPhone, code: userCode})
        .then((resp) => {
          res.status(200).json({message: 'Success sent', resp})
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    } else {
      console.log('Please fill all vals')
    }
  }

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
      const {firstName, lastName, email, role, password} = req.body
      //   const hash = await bcrypt.hashSync(password, 10)
      const checkUser = await USER.findOne({
        where: {email: email},
      })
      if (checkUser) {
        return res.status(400).json({
          status: 400,
          message: 'User is already SignUp',
        })
      } else {
        // type userType = {
        //   id: string
        //   firstName: string
        //   lastName: string
        //   email: string
        //   password: string
        // }

        const createData: any = await USER.create({
          firstName,
          lastName,
          email,
          role,
          password,
        })
        //create profile
        // BILLINGADDRESS.drop()
        // ADDRESS.drop()

        if (createData) {
          const profiledata = {
            firstName: createData.firstName,
            lastName: createData.lastName,
            email: createData.email,
            userId: createData.id,
          }
          await PROFILE.create({...profiledata})
        }
        //create pofile
        const user = await USER.findOne({
          where: {email: email},
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
        })
        res.status(200).json({
          status: 200,
          message: 'account created successfully',
          token: encode({
            id: createData.id,
            email: createData.email,
            role: createData.role,
          }), //changed the token to keep same fields as login
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
      const {email, password} = req.body
      const findUser = await USER.findOne({
        where: {email: email},
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'role',
          'password',
        ],
      })
      if (!findUser) {
        res.status(404).json({message: 'User not found'})
      } else {
        const dbPassword = findUser.dataValues.password
        const decreptedPassword = await bcrypt.compare(password, dbPassword)
        // console.log(decreptedPassword)
        if (decreptedPassword) {
          res.status(200).json({
            stastus: 200,
            message: 'Login succefull ',
            data: findUser,
            token: encode({
              id: findUser.dataValues.id,
              email: findUser.dataValues.email,
              role: findUser.dataValues.role,
            }),
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
        attributes: {exclude: ['password']},
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
      await USER.destroy({where: {id: userid}})
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

  static async createNewRole(req: Request, res: Response) {
    const {name, description} = req.body
    try {
      if (!name || !description) {
        res.status(400).json({
          status: 400,
          message: 'Please Add both Role name and descripiton',
        })
      } else {
        const newRole = await ROLE.create({name, description})
        res.status(201).json({'New Role': newRole})
      }
    } catch (err) {
      res.json({statusCode: 400, message: err})
    }
  }

  static async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await ROLE.findAll()
      res.status(200).json({statusCode: 200, data: roles})
    } catch (error) {
      res.status(400).json({statusCode: 400, data: error})
    }
  }

  static async getOneRole(req: Request, res: Response) {
    const name = req.params.name
    try {
      const role = await ROLE.findOne({
        where: {name: name},
      })
      if (role) {
        res.status(200).json({statusCode: 200, data: role})
      } else {
        res.status(404).json({statusCode: 404, Message: 'User does not exist'})
      }
    } catch (error) {
      res.status(400).json({statusCode: 400, data: error})
    }
  }

  static async deleteOneRole(req: Request, res: Response) {
    const roleName = req.params.name

    const role = await ROLE.findOne({
      where: {name: roleName},
    })
    try {
      if (role) {
        // Delete everyone named "Jane"
        await ROLE.destroy({
          where: {
            name: roleName,
          },
        })
        res
          .status(200)
          .json({statusCode: 200, message: 'Success', 'Deleted Role': role})
      } else {
        res.status(404).json({statusCode: 404, Message: 'Role does not exist'})
      }
    } catch (error) {
      res.status(400).json({statusCode: 400, data: error})
    }
  }

  static async updateOneRole(req: Request, res: Response) {
    const roleName = req.params.name
    const role = await ROLE.findOne({
      where: {name: roleName},
    })
    const {name, description} = req.body

    try {
      if (!role) {
        return res.status(404).json({
          statusCode: 404,
          message: `Role called ${name} does not exist`,
        })
      } else {
        // Change everyone without a last name to "Doe"
        await ROLE.update(
          {name, description},
          {
            where: {
              name: roleName,
            },
          },
        )
        return res.status(201).json({statusCode: 201, message: 'Success'})
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({statusCode: 400, error: 'Server error'})
    }
  }
}
export default auth
