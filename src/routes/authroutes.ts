import { Router } from "express";
import passports from "passport";
import auth from "../controllers/authController";
import signupValidation from "../middlewares/signupValidation";
import GoogleController from "../controllers/googleAuthController";
import resetpass from "../controllers/resetcontrollers";

const router = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - users
 *     summary: all Users
 *     security: []
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - email
 *                    - firstName
 *                    - lastName
 *                    - password
 *                 properties:
 *                    email:
 *                      type: string
 *                    firstname:
 *                      type: string
 *                    lastName:
 *                       type: string
 *                    password:
 *                       type : string
 *     responses:
 *       201:
 *             description: successfully logged in;
 *
 * */

/**
 * @swagger
 * /sendcode/{phone}:
 *  get:
 *      tags:
 *          - users
 *      summary: Send code (OTP) to user-provided phone number
 *      security: []
 *      parameters:
 *          - in: path
 *            name: phone
 *            schema:
 *                  type: string
 *            description: Phone Number
 *            required: true
 *      responses:
 *          200:
 *              description: OTP is successfully sent
 *          400:
 *              description: Invalid phone number
 */

/**
 * @swagger
 * /verify/{phone}/{code}:
 *  get:
 *      tags:
 *          - users
 *      summary: Verify user-provided OTP
 *      security: []
 *      parameters:
 *          - in: path
 *            name: phone
 *            schema:
 *                  type: string
 *            description: Phone number
 *            required: true
 *
 *          - in: path
 *            name: code
 *            schema:
 *                  type: string
 *            description: Code sent on Phone
 *            required: true
 *      responses:
 *          200:
 *             description: Verification successfully
 *          400:
 *             description: Invalid phone or code
 *          404:
 *             description: Incorrect OTP
 */

router.post("/signup", signupValidation, auth.signup);
router.post("/login", auth.Login);
router.get("/users", auth.getAlluser);
router.delete("/delete/:id", auth.deleteUser);
router.get("/sendcode/:phone", auth.sendCode);
router.get("/verify/:phone/:code", auth.verify2FA);
// router.post('/logout', auth.logout)
router.post("/logout", auth.logout);
// router.post("/authorize", auth.authorize);
router.post("/resetpassword/link", resetpass.sendlink);
router.patch("/changepassword/:useremail/:token", resetpass.changepassword);
router.patch("/update-password", auth.updatePassword);
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
