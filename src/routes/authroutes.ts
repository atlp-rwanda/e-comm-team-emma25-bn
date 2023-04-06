import { Router } from "express";
import passports from "passport";
import auth from "../controllers/authController";
import signupValidation from "../middlewares/signupValidation";
import GoogleController from "../controllers/googleAuthController";
import resetpass from "../controllers/resetcontrollers";
import Stripe from 'stripe'
import verifyToken from "../middlewares/verifyToken";
import { roleAuthorization } from "../middlewares/role.middleware";


const stripe = new Stripe (process.env.STRIPE_SECRET as string, {
    apiVersion: "2022-11-15",
});

const router = Router();

router.post('/signup', signupValidation, auth.signup)
router.post('/login', auth.Login)
router.post('/signup', signupValidation, auth.signup)
router.post('/login', auth.Login)
router.get('/users', auth.getAlluser)
router.delete('/delete/:id',roleAuthorization(["admin"]), auth.deleteUser)
router.get('/sendcode/:phone', auth.sendCode)
router.get('/verify/:phone/:code', auth.verify2FA)
router.get('/verify/:code', verifyToken, auth.verify2FA)
router.post("/logout", auth.logout);
// router.post("/authorize", auth.authorize);
router.post("/resetpassword/link", resetpass.sendlink);
router.patch("/changepassword/:useremail/:token", resetpass.changepassword);
router.patch('/update-password', auth.updatePassword);
router.post('/verify-email/:token', auth.verifyEmail);
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

/* this delete user route is not protected it is just for testing and setting up the project*/

export default router;
