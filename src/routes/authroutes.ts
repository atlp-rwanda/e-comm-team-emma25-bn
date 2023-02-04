import {Router} from "express"
import auth from "../controllers/authController"

const router = Router()


router.post('/signup', auth.signup)
router.get('/users', auth.getAlluser)
router.delete('/delete/:id', auth.deleteUser)
router.get('/sendcode/:phone', auth.sendCode)
router.get('/verify/:phone/:code', auth.verify2FA)
/* this delete user route is not protected it is just for testing and setting up the project*/

export default router 