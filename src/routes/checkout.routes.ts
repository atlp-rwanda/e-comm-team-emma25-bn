import { Router } from 'express';
import {  cartcheckout, cartsuccess, checkoutController } from '../controllers/Checkout.controller';
import verifyToken from '../middlewares/verifyToken';

const checkoutRouter = Router();

checkoutRouter.post('/payment/:productId', verifyToken ,checkoutController.checkoutPayment);
checkoutRouter.post("/checkoutcart/:cardId", verifyToken , cartcheckout )
checkoutRouter.post("/cartcheckout/success/:cartid", verifyToken ,cartsuccess)

export default checkoutRouter;