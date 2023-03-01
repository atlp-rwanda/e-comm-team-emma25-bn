import { Router } from "express"
import auth from "../controllers/authController"
import signupValidation from "../middlewares/signupValidation"
import loginValidation from "../middlewares/loginValidation"
import resetpass from "../controllers/resetcontrollers"

const router = Router()


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


/* this delete user route is not protected it is just for testing and setting up the project*/

router.post('/verify-email/:token', auth.verifyEmail)

export default router
