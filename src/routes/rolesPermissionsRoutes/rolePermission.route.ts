import RolesPermissionsController from "../../controllers/rolesPermissionControllers/rolePermission.controller";
import { Router } from "express";

const router = Router();
router.post(
    "/rolepermission",
    RolesPermissionsController.createNewRolePermission
);

export default router;
