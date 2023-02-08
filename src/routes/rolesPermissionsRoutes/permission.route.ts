import { Router } from "express";
import permissionsController from "../../controllers/rolesPermissionControllers/permission.controller";
import { roleAuthorization } from "../../middlewares/role.middleware";
const router = Router();
router.post(
    "/permission",
    roleAuthorization(["admin"]),
    permissionsController.createNewPermission
);
router.get(
    "/permission",
    roleAuthorization(["admin"]),
    permissionsController.getAllPermissions
);
router.get(
    "/permission/:name",
    roleAuthorization(["admin"]),
    permissionsController.getOnePermission
);
router.delete(
    "/permission/:name",
    roleAuthorization(["admin"]),
    permissionsController.deleteOnePermission
);
router.patch(
    "/permission/:name",
    roleAuthorization(["admin"]),
    permissionsController.updateOnePermission
);

export default router;
