import RolesController from "../../controllers/rolesPermissionControllers/role.controller";
import { Router } from "express";

const router = Router();
router.patch("/userrole", RolesController.updateUserRole);
router.post("/role", RolesController.createNewRole);
router.get("/role", RolesController.getAllRoles);
router.get("/role/:name", RolesController.getOneRole);
router.delete("/role/:name", RolesController.deleteOneRole);
router.patch("/role/:name", RolesController.updateOneRole);

export default router;
