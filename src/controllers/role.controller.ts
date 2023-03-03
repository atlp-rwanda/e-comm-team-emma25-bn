// import USER from '../models/User'
import USER from '../models/User'
import ROLE from '../db/models/Role'
// import ROLE from ''

import {Request, Response} from 'express'

import {config} from 'dotenv'
config()

/* eslint-disable @typescript-eslint/no-explicit-any */
class RolesController {
  static async updateUseRole(req: Request, res: Response) {
    const {email, roleName} = req.body
    try {
      const user = await USER.findOne({where: {email}})
      if (!user) {
        return res
          .status(404)
          .json({error: `User with email ${email} not found`})
      } else {
        const roleID = await ROLE.findOne({where: {name: roleName}})
        if (roleID) {
          await user.update({roleID})
          return res.status(200).json({
            message: `User with email ${email} is update to ${roleName} role`,
          })
        } else {
          return res.status(404).json({
            statusCode: 404,
            message: `Role with called ${roleName} does not exist`,
          })
        }
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({statusCode: 500, error})
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
        res.status(404).json({
          statusCode: 404,
          Message: `Role with name ${name}  does not exist`,
        })
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
        await ROLE.destroy({
          where: {
            name: roleName,
          },
        })
        res
          .status(200)
          .json({statusCode: 200, message: 'Success', 'Deleted Role': role})
      } else {
        res.status(404).json({
          statusCode: 404,
          Message: `Role with name ${roleName} does not exist`,
        })
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
          message: `Role with the name ${name} does not exist`,
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
export default RolesController
