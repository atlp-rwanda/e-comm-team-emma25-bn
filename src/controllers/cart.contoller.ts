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
                const product:any = await  Product.findOne({where: {ProductID: item},include: [{model: ProductImages}]})
                if(product){
                    const productcart={
                        cartId: foundcart,
                        ProductID: item,
                        price: product.price,
                        productName: product.name,
                        image: product.pro_images[1].ImagePath
                    }
              const createdcartitem = await cartItem.create(productcart)
              if (createdcartitem){
             const newcart: any= await Cart.findOne({where: {id: foundcart.id} ,include:[{model : cartItem}]})
              newcart.total =
              }
                }
                else{
                    res.status(404).json({
                        statusCode: 404,
                        message: "product not found"
                        
                    })
                }
            }            
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })
        }

    }
} 