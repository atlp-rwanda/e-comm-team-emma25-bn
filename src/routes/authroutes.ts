import {Router} from 'express'
import auth from '../controllers/authController'
import signupValidation from '../middlewares/signupValidation'
import loginValidation from '../middlewares/loginValidation'
import resetpass from '../controllers/resetcontrollers'

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
router.post('/login', loginValidation, auth.Login)
router.get('/users', auth.getAlluser)
router.delete('/delete/:id', auth.deleteUser)
router.get('/sendcode/:phone', auth.sendCode)
router.get('/verify/:phone/:code', auth.verify2FA)
// router.post('/logout', auth.logout)
router.post('/logout', auth.logout)
router.post('/authorize', auth.authorize)
router.post('/resetpassword/link', resetpass.sendlink)
router.patch('/changepassword/:useremail/:token', resetpass.changepassword)
router.post('/role', auth.createNewRole)
router.get('/role', auth.getAllRoles)
router.get('/role/:name', auth.getOneRole)
router.delete('/role/:name', auth.deleteOneRole)
router.patch('/role/:name', auth.updateOneRole)

export default router
