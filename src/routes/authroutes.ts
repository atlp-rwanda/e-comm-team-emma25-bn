import { Router, Request, Response, NextFunction } from "express";
import passports from "passport";
import auth from "../controllers/authController";
import signupValidation from "../middlewares/signupValidation";
import GoogleController from "../controllers/googleAuthController";
import resetpass from "../controllers/resetcontrollers";
import Stripe from "stripe";
import verifyToken from "../middlewares/verifyToken";
import isAdmin from "../middlewares/checkAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

const router = Router();

router.post('/signup', signupValidation, auth.signup)
router.post('/login', auth.Login)
router.post('/signup', signupValidation, auth.signup)
router.post('/login', auth.Login)
router.get('/users', auth.getAlluser)
router.delete('/delete/:id', auth.deleteUser)
router.get('/sendcode/:phone', auth.sendCode)
router.get('/verify/:phone/:code', auth.verify2FA)
router.post("/logout", auth.logout);
// router.post("/authorize", auth.authorize);
router.post("/resetpassword/link", resetpass.sendlink);
router.patch("/changepassword/:useremail/:token", resetpass.changepassword);
router.patch("/update-password", auth.updatePassword);
router.post("/verify-email/:token", auth.verifyEmail);
router.get(
  "/auth/google",
  passports.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/callback",
  passports.authenticate("google", {
    successRedirect: "/googleResponse",
    failureRedirect: "/auth/error",
  })
);
router.get("/googleResponse", GoogleController.googleAuth);
router.post("/authorize", auth.authorize);
/* this delete user route is not protected it is just for testing and setting up the project*/
router.get(
  "/users/:id/disable-account",
  verifyToken,
  isAdmin,
  auth.disableAccount
);

export default router;
