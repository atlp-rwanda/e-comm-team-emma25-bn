import  express  from "express";
import { getyournotifications } from "../controllers/Notification";
import verifyToken from "../middlewares/verifyToken";

const NotificationRouter = express.Router()

NotificationRouter.get("/notifications", verifyToken, getyournotifications)

export default NotificationRouter