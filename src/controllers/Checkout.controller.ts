import { Request, Response } from 'express';
import Stripe from 'stripe';
import Order from '../db/models/order.model';
import OrderProduct from '../db/models/orderproducts.model';
import Product from '../db/models/Product';
import shortUniqueId from "short-unique-id";
import Cart from '../db/models/cart';
import cartItem from '../db/models/cartItems';
import { config } from 'dotenv';
import ProductImages from '../db/models/Image';
import sendNotitfictation from '../services/notifiction.service';
config()
/* eslint-disable @typescript-eslint/no-explicit-any */



function getDateInTwoWeeks() {
  const today = new Date(); // get the current date and time
  const twoWeeksFromNow = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000)); // add 14 days (in milliseconds) to the current date
  return twoWeeksFromNow.toISOString().slice(0,10); // format date as yyyy-mm-dd
}   
const uids = new shortUniqueId({ length: 12 });

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}` , {
  apiVersion: '2022-11-15',
});

// checkout controller.
// this controller will record a customer in stripe
// then makes payment of $40
export const checkoutController = {
   async checkoutPayment(req: Request, res: Response) {
    const user: any = req.user
    const productid = req.params.productId       
    try {
    //get the product before buying it 
    const product:any = await Product.findOne({where: {ProductID: productid}, include : [ {model: ProductImages}]})
    if(!product){
      throw new Error("there is no product with that id");      
    }
    if(product.quantity<= 0){
      throw new Error("the product you are looking for is out of stoke");   

    }      
      // the code below creates a  
      const productstripe: any = await stripe.products.create({
        name: product.ProductName,
        description: product.ProductDesc,
        images: [product.pro_images[0].ImagePath],
      });      
      const itemprice:any = await stripe.prices.create({
        product: productstripe.id,
        unit_amount: product.ProductPrice,
        currency: 'usd',
      });
      // we still need ID coming from the front-end for this to work

      const session: any = await stripe.checkout.sessions.create({
        line_items:[{
          price: itemprice.id,
          quantity: 1,
        }         
        ],
        metadata: {
          userId: user.id,
          productId: productid,
        },

        mode: 'payment',
        success_url: `${process.env.HOST}/product/success/${productid}`,
        cancel_url: `${process.env.HOST}/cancel`,
      });
          // Create an order in your database        
      
    res.send({url : session.url})  
     
    } catch (err) {
      if (err instanceof Error) {      
        return res.status(400).json({ success: false, error: err.message });
      }
    }
  } 
};

export const cartcheckout= async (req:Request, res: Response)=>{
  const cartid = req.params.cardId
  const user:any = req.user

  try {    
    const cart:any = await Cart.findOne({where: {id: cartid} , include: [{model: cartItem}]})  
  
    if(!cart){
      throw new Error("there is no cart with that id");
      
    }
     if(cart.CartItems.length == 0){
      throw new Error("your cart is empty");
      
    }

  
    async function createStripeItems(cartItems: any){
      const items: { price: string; quantity: number; }[] = [];  
      for (const element of cartItems) {
        const product: any = await stripe.products.create({
          name: element.ProductName,
          description: element.ProductName,
          images: [element.image],
        });
    
        const itemPrice: any = await stripe.prices.create({
          product: product.id,
          unit_amount: element.price,
          currency: 'usd',
        });
    
        items.push({ price: itemPrice.id, quantity: element.quantity });
      }
    
      return items;
    }
    
    // To use the function:
    const items = await createStripeItems(cart.CartItems);
    const session: any = await stripe.checkout.sessions.create({
      line_items: items,
      payment_method_types: ['card'],
      metadata: {
          userId: user.id,
        cartId: cartid,
      },
      mode: 'payment',
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/cancel`,
    });
    res.send({url:  session.url});
  } catch (error:any) {
    res.status(400).json({
      statusCode: 400,
      message: error.message
    })
  }  
}
 const endpointSecret = `${process.env.ENDPPOINT_SECRET}`;

export async  function successwebhook(req: Request, res: Response){

  const sig: any = req.headers['stripe-signature'] ;
  let event: any=0;
  try {    
    event  = stripe.webhooks.constructEvent(req['rawBody'],sig,endpointSecret);
  } catch (err: any ) {
    console.log(err.message)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      
      const checkoutSessionCompleted: any  = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed      
      if(checkoutSessionCompleted.metadata.cartId){
        const cart: any = await Cart.findOne({where: {id:checkoutSessionCompleted.metadata.cartId}, include:[{model: cartItem}]})        
        await cartItem.destroy({where: {cartId: checkoutSessionCompleted.metadata.cartId}})
        const delivarydate=getDateInTwoWeeks()        
        const order: any = await Order.create({
          orderid : uids(),
          userId: checkoutSessionCompleted.metadata.userId,
          amountPaid: checkoutSessionCompleted.amount_total,
          paymentid: checkoutSessionCompleted.payment_intent,
          expectedDeliveryDate: delivarydate,
          status: 'Paid',
            });
            cart.CartItems.forEach(async (element: any) => {
      const product:any = await Product.findByPk(element.productID)
              await OrderProduct.create({        
       Orderid: order.Orderid,
       price: element.price,
       quantity: element.quantity,
       productName: element.ProductName,
       productId: element.productID,
       productQuantity: element.quantity
          })          
       await sendNotitfictation(checkoutSessionCompleted.metadata.userId,product.ProductOwner,"PurchasedProduct", 
    `${element.ProductName} has been succesfully purchased buy ${checkoutSessionCompleted.metadata.userId}`,
    `your ${element.ProductName} has been purchased`,
    `you have successfully bought ${element.ProductName}`)
             
        });
        cart.Total=0
        await cart.save()
      }
      if(checkoutSessionCompleted.metadata.productId){
   const product: any = await Product.findByPk(checkoutSessionCompleted.metadata.productId);
   const delivarydate=getDateInTwoWeeks()
   const order: any = await Order.create({
     orderid : uids(),
     userId: checkoutSessionCompleted.metadata.userId,
     amountPaid: product.ProductPrice,
     paymentid: checkoutSessionCompleted.payment_intent,
     expectedDeliveryDate: delivarydate,
     status: 'Paid',
       });
    await OrderProduct.create({
     Orderid: order.Orderid,
     price: product.ProductPrice,
     productName: product.ProductName,
     productId: product.ProductID     
   })
   if(order){
    
    await sendNotitfictation(checkoutSessionCompleted.metadata.userId,product.ProductOwner, "PurchasedProduct", 
    `${product.ProductName} has been succesfully purchased buy ${checkoutSessionCompleted.metadata.userId}`,
    `your ${product.ProductName} has been purchased`,
    `you have successfully bought ${product.ProductName}`
    )
    
     product.qauntity = product.quantity - 1

     await product.save()
   }
   
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}