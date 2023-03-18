import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2022-11-15',
});

// checkout controller.
// this controller will record a customer in stripe
// then makes payment of $40
export const checkoutController = {
  async checkoutPayment(req: Request, res: Response) {
    try {
      // the code below creates a customer
      const customer = await stripe.customers.create({
        email: req.body.email,
        source: req.body.tokenId,
        description: 'My ecommerce customers',
      });
      // we still need ID coming from the front-end for this to work

      await stripe.paymentIntents.create({
        amount: 7000, //this equates to $70, it's just a generic number for now
        currency: 'usd',
        customer: customer.id,
        confirm: true,
      });

      return res.status(200).json({
        success: true,
        message: 'Successfully made a payment',
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ success: false, error: err.message });
      }
    }
  },
};
