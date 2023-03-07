import { Router } from "express";
import permissionsController from "../../controllers/rolesPermissionControllers/permission.controller";

const router = Router();
router.post("/permission", permissionsController.createNewPermission);
router.get("/permission", permissionsController.getAllPermissions);
router.get("/permission/:name", permissionsController.getOnePermission);
router.delete("/permission/:name", permissionsController.deleteOnePermission);
router.patch("/permission/:name", permissionsController.updateOnePermission);

export default router;
