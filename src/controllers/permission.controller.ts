// import USER from '../models/User'
import ROLE from "../db/models/Role";
import PERMISSION from "../db/models/Permission";
// import ROLE from ''

import { Request, Response } from "express";
import { config } from "dotenv";
config();

/* eslint-disable @typescript-eslint/no-explicit-any */
class PermissionsControler {
    // PERMISSIONS
    static async createNewPermission(req: Request, res: Response) {
        const { name, description } = req.body;
        try {
            if (!name || !description) {
                res.status(400).json({
                    status: 400,
                    message: "Please Add both Permission name and descripiton",
                });
            } else {
                const newPermission = await PERMISSION.create({
                    name,
                    description,
                });
                res.status(201).json({ "New Permission": newPermission });
            }
        } catch (err) {
            res.json({ statusCode: 400, message: err });
        }
    }

    static async getAllPermissions(req: Request, res: Response) {
        try {
            const permissions = await PERMISSION.findAll();
            res.status(200).json({ statusCode: 200, data: permissions });
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    static async getOnePermission(req: Request, res: Response) {
        const name = req.params.name;
        try {
            const permission = await PERMISSION.findOne({
                where: { name: name },
            });
            if (permission) {
                res.status(200).json({ statusCode: 200, data: permission });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: `Permission with name ${name} does not exist`,
                });
            }
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    static async deleteOnePermission(req: Request, res: Response) {
        const permissionName = req.params.name;
        const permission = await ROLE.findOne({
            where: { name: permissionName },
        });
        try {
            if (permission) {
                await PERMISSION.destroy({
                    where: {
                        name: permissionName,
                    },
                });
                res.status(200).json({
                    statusCode: 200,
                    message: "Success",
                    "Deleted Role": permission,
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: `Permission with name ${permissionName} does not exist`,
                });
            }
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    static async updateOnePermission(req: Request, res: Response) {
        const permissionName = req.params.name;
        const permission = await PERMISSION.findOne({
            where: { name: permissionName },
        });
        const { name, description } = req.body;

        try {
            if (!permission) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `Permission with the name ${permissionName} does not exist`,
                });
            } else {
                // Change everyone without a last name to "Doe"
                await PERMISSION.update(
                    { name, description },
                    {
                        where: {
                            name: permissionName,
                        },
                    }
                );
                return res
                    .status(201)
                    .json({ statusCode: 201, message: "Success" });
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ statusCode: 400, error: "Server error" });
        }
    }
}
export default PermissionsControler;
