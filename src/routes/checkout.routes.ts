import { Router } from 'express';
import {  checkoutController } from '../controllers/Checkout.controller';

const checkoutRouter = Router();

checkoutRouter.post('/payment', checkoutController.checkoutPayment);

export default checkoutRouter;