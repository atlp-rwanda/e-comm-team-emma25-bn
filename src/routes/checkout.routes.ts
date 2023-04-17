import { Router } from 'express';
import  express  from 'express';
import {  cartcheckout, checkoutController, successwebhook } from '../controllers/Checkout.controller';
import verifyToken from '../middlewares/verifyToken';

const checkoutRouter = Router();

checkoutRouter.post('/payment/:productId', verifyToken ,checkoutController.checkoutPayment);
checkoutRouter.post("/checkoutcart/:cardId", verifyToken , cartcheckout )
checkoutRouter.post('/webhook', express.raw({type: 'application/json'}), successwebhook)
export default checkoutRouter;