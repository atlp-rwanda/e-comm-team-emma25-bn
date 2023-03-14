import RolesController from "../../controllers/rolesPermissionControllers/role.controller";
import { Router } from "express";
import { roleAuthorization } from "../../middlewares/role.middleware";
const router = Router();
router.patch(
    "/userrole",
    roleAuthorization(["admin"]),
    RolesController.updateUserRole
);
router.post(
    "/role",
    roleAuthorization(["admin"]),
    RolesController.createNewRole
);
router.get("/role", roleAuthorization(["admin"]), RolesController.getAllRoles);
router.get(
    "/role/:name",
    roleAuthorization(["admin"]),
    RolesController.getOneRole
);
router.delete(
    "/role/:name",
    roleAuthorization(["admin"]),
    RolesController.deleteOneRole
);
router.patch(
    "/role/:name",
    roleAuthorization(["admin"]),
    RolesController.updateOneRole
);

export default router;
