// import USER from '../models/User'
import ROLE from "../../db/models/Role.model";
import ROLE_PERMISSION from "../../db/models/RolePermission.model";
// import ROLE from ''

import { Request, Response } from "express";

import { config } from "dotenv";
import PERMISSION from "../../db/models/Permission.model";
config();

/* eslint-disable @typescript-eslint/no-explicit-any */
class RolesPermissionsController {
    static async createNewRolePermission(req: Request, res: Response) {
        const { roleId, permissionId } = req.body;
        try {
            if (!roleId || !permissionId) {
                res.status(400).json({
                    status: 400,
                    message: "Please enter both roleId and permissionId",
                });
            } else {
                const roleExist = await ROLE.findOne({ where: { id: roleId } });
                const permissionExist = await PERMISSION.findOne({
                    where: { id: permissionId },
                });
                if (roleExist && permissionExist) {
                    const newRolePermission = await ROLE_PERMISSION.create({
                        permissionId: permissionId,
                        roleId: roleId,
                    });
                    return res.status(201).json({
                        statusCode: 201,
                        message: `role ${roleId} now has ${permissionId} permission`,
                        "New role permission": newRolePermission,
                    });
                } else {
                    if (!roleExist) {
                        return res.status(404).json({
                            statusCode: 404,
                            message: `role ${roleId} not found`,
                        });
                    }
                    if (!permissionExist) {
                        return res.status(404).json({
                            statusCode: 404,
                            message: `permission ${permissionId}  not found`,
                        });
                    }
                }
            }
        } catch (err) {
            res.json({ statusCode: 400, message: err });
        }
    }
}
export default RolesPermissionsController;
