import RolesPermissionsController from "../../controllers/rolesPermissionControllers/rolePermission.controller";
import { Router } from "express";
import { roleAuthorization } from "../../middlewares/role.middleware";
const router = Router();
router.post(
    "/rolepermission",
    roleAuthorization(["admin"]),
    RolesPermissionsController.createNewRolePermission
);

export default router;
