import Profiles from "../controllers/profilepageController";
import express from "express"
import verifyToken from "../middlewares/verifyToken";
import profileValidator from "../middlewares/profilevalidation";

const router = express.Router();

router.get("/profile/:userId", Profiles.getprofile)
router.patch("/profile/edit",verifyToken, profileValidator, Profiles.edit)
router.get("/profiles", Profiles.getall)


export default router;
