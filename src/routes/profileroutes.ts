import Profiles from "../controllers/profilepageController";
import express from "express";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/profile/:userId", Profiles.getprofile);
router.patch("/profile/edit", verifyToken, Profiles.edit);
router.get("/profiles", Profiles.getall);

export default router;
