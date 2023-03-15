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
        images: [product.pro_images[1].ImagePath],
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
        mode: 'payment',
        success_url: `${process.env.HOST}/product/success/${productid}`,
        cancel_url: `${process.env.HOST}/cancel`,
      });
          // Create an order in your database        
          const delivarydate=getDateInTwoWeeks()
    const order: any = await Order.create({
      orderid : uids(),
      userId: user.id,
      amountPaid: product.ProductPrice,
      paymentid: session.id,
      expectedDeliveryDate: delivarydate,
      status: 'Pending',
    });
    
     await OrderProduct.create({
      Orderid: order.Orderid,
      price: product.ProductPrice,
      productName: product.ProductName,
      productId: product.ProductID
    })
    if(order){
      product.qauntity = product.quantity - 1
      await product.save()
    } 
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
      mode: 'payment',
      success_url: `${process.env.HOST}/cart/payment/?cart=${cartid}`,
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
 export const cartsuccess = async  (req: Request,res: Response)=>{
    const cartid = req.params.cartid
  const user: any = req.user 
    
    try {
    const cart:any = await Cart.findOne({where: {id: cartid} , include: [{model: cartItem}]})  
    const delivarydate=getDateInTwoWeeks()    
    const order: any = await Order.create({
      orderid : uids(),
      userId: user.id,
      amountPaid: cart.Total,      
      paymentid: cart.id,
      expectedDeliveryDate: delivarydate,
      status: 'Pending',
    });
   
    cart.CartItems.forEach(async (element: any) => {
      await OrderProduct.create({
       Orderid: order.Orderid,
       price: element.price,
       quantity: element.quantity,
       productName: element.ProductName,
       productId: element.productID
     })
     if(order){
     await cartItem.destroy({where: {cartId : cartid}})    
     res.status(200).json({
      statusCode: 200,
      message: "you have sucessfully paid for your order"

     }) 
     }

        
    });
     cart.Total = 0
     await cart.save()
      
    } catch (error: any) {
      res.status(400).json({
        statusCode: 400,
        message: error.message
      })
      
    }

 }