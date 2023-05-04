import express from "express"
import ORDER from "../controllers/updateorder.controller"
import { roleAuthorization } from "../middlewares/role.middleware"
import verifyToken from "../middlewares/verifyToken"

const orderStatusRoutes = express.Router()



orderStatusRoutes.patch("/change/:orderid", roleAuthorization(["admin"]) ,ORDER.changeStatus)
orderStatusRoutes.get("/getall", roleAuthorization(["admin"]), ORDER.getallorders)
orderStatusRoutes.get("/userorders" ,verifyToken, roleAuthorization(["seller" , "user"]), ORDER.getpersonalorders)

export default orderStatusRoutes
