import {Router} from "express"
import auth from "../controllers/authController"
import signupValidation from "../middelwares/signupValidation"

const router = Router()

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
router.post('/signup', signupValidation, auth.signup)
router.get('/users', auth.getAlluser)
router.delete('/delete/:id', auth.deleteUser)
router.get('/sendcode/:phone', auth.sendCode)
router.get('/verify/:phone/:code', auth.verify2FA)
router.get('/logout', auth.logout)
/* this delete user route is not protected it is just for testing and setting up the project*/

export default router
