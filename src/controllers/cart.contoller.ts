import Cart from "../db/models/cart";
import cartItem from "../db/models/cartItems";
import { Request, Response } from "express";
import Product from "../db/models/Product";
import ProductImages from "../db/models/Image";

class CART {
    static async addto(req: Request, res: Response){
        const item = req.params.productID        
        const user:any = req.user
        const foundcart: any  = await Cart.findOne({where: {buyerId: user.id}})
        try {
            if (user.role== "buyer" ||  user.role == "user"){
                const product:any = await Product.findOne({where: {ProductID: item},include: [{model: ProductImages}]})
                           
                if(product){
                    const productcart={
                        cartId: foundcart.id,
                        productID: item,
                        price: product.ProductPrice,
                        ProductName: product.ProductName,
                        image: product.pro_images[1].ImagePath
                    }                                      
              const createdcartitem = await cartItem.create({...productcart})
              if (createdcartitem){
             const newcart: any= await Cart.findOne({where: {id: foundcart.id} ,include:[{model : cartItem}]})
             const cartItemsArray = newcart.CartItems             
             let totalprice = 0
             interface CartItem {
                productID: number;                
                price: number;
                ProductName: string;
                image: string;
                cartId: string;
              }             
             cartItemsArray.forEach((element:CartItem) => {
                totalprice= totalprice + element.price 
              });             
              newcart.Total = totalprice
              newcart.save()
             // await Cart.update({Total: totalprice },{where: {id: foundcart.id} })            

               
               res.status(200).json({
                statusCode: 200,
                message : "cart retrieved successfully",
                data: newcart,
               }) } }
                else{
                    res.status(404).json({
                        statusCode: 404,
                        message: "product not found"                       
                    })}}    
            else{
                res.status(401).json({
                    statusCode: 401,
                    message: "you are not a buyer"
                })
            }        
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })
        }    }} 
export default CART