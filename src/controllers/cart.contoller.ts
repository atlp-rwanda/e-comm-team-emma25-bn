import Cart from "../db/models/cart";
import cartItem from "../db/models/cartItems";
import { Request, Response } from "express";
import Product from "../db/models/Product";
import ProductImages from "../db/models/Image";
import { Op } from "sequelize";
import { createCart } from "../services/cart.services";
/* eslint-disable @typescript-eslint/no-explicit-any */


function gettotal(items: any) {
    const cartItemsArray = items.CartItems
    let totalprice = 0
    interface CartItem {
        productID: number;
        price: number;
        ProductName: string;
        image: string;
        cartId: string;
        quantity: number;
    }
    cartItemsArray.forEach((element: CartItem) => {
        totalprice = totalprice + element.price * element.quantity
    });
    return totalprice
}

class CART {
    static async additem(req: Request, res: Response) {
        const item = req.params.productID
        const user: any = req.user
        let foundcart: any = await Cart.findOne({ where: { buyerId: user.id }, include: [{ model: cartItem }] })    
        try {
            if (user.role == "buyer" || user.role == "user") {
                if (!foundcart) {
                    foundcart = await createCart(user.id, 0)
                }
                const product: any = await Product.findOne({ where: { ProductID: item }, include: [{ model: ProductImages }] })
                if (product) {
                    const productcart = {
                        cartId: foundcart.id,
                        productID: item,
                        price: product.ProductPrice,
                        ProductName: product.ProductName,
                        image: product.pro_images[0].ImagePath
                    }
                    if (product.quantity > 0) {
                        const itemInCart: any = await cartItem.findOne({ where: { [Op.and]: [{ cartId: foundcart.id, productID: item }] } })
                        if (itemInCart) {
                            await cartItem.update({ quantity: itemInCart.quantity + 1 }, { where: { id: itemInCart.id } });
                            product.quantity = product.quantity - 1
                            await product.save()
                        }
                        else {
                            await cartItem.create({ ...productcart })
                            product.quantity - 1
                            await product.save()
                        }

                        const newcart: any = await Cart.findOne({ where: { id: foundcart.id }, include: [{ model: cartItem }] })

                        newcart.Total = gettotal(newcart)
                        await newcart.save()
                        // await Cart.update({Total: totalprice },{where: {id: foundcart.id} })            


                        res.status(200).json({
                            statusCode: 200,
                            message: `${productcart.ProductName} has been added to cart`,
                            data: newcart,
                        })
                    } else {

                        throw new Error("not enough product in stoke")
                    }
                }
                else {
                    res.status(404).json({
                        statusCode: 404,
                        message: "product not found"
                    })
                }
            }
            else {
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
        }
    }
    static async removeitem(req: Request, res: Response) {
        const cartitemid = req.params.cartitemid
        const loggeduser: any = req.user
        try {
            const foundcart: any = await Cart.findOne({ where: { buyerId: loggeduser.id } })
            const foundcartitem: any = await cartItem.findOne({ where: { id: cartitemid } })
            if (!foundcart) {
                throw new Error("cart not found")
            }
            if (!foundcartitem) {
                throw new Error("product not found in cart")
            }
            const product: any = await Product.findOne({ where: { ProductID: foundcartitem.productID }, include: [{ model: ProductImages }] })

            if (foundcart.id == foundcartitem.cartId) {

                if (foundcartitem.quantity == 1) {
                    await cartItem.destroy({ where: { id: cartitemid } })
                    product.quantity = product.quantity + 1
                    await product.save()
                } else if (foundcartitem.quantity > 1) {
                    foundcartitem.quantity = foundcartitem.quantity - 1
                    await foundcartitem.save()
                    product.quantity = product.quantity + 1
                    await product.save()
                }
                const newcart: any = await Cart.findOne({ where: { buyerId: loggeduser.id }, include: [{ model: cartItem }] })
                newcart.Total = gettotal(newcart)
                await newcart.save()

                res.status(200).json({
                    statusCode: 200,
                    message: `removed item from cart`,
                    cart: newcart
                })
            }
            else {
                res.status(401).json({
                    statusCode: 401,
                    message: "unauthorized to change this cart"
                })
            }
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message

            })
        }

    }
    static async updateCart(req: Request, res: Response) {
        const user: any = req.user
        const cartItemid = req.params.cartItemid
        const quantity = req.body.itemQuantity
        try {
            const cartitem: any = await cartItem.findOne({ where: { id: cartItemid } })
            const usercart: any = await Cart.findOne({ where: { buyerId: user.id } })
            if (!cartitem) {
                throw new Error("item doesnt exist")
            }
            if (usercart.id == cartitem.cartId) {
                const itemproduct: any = await Product.findOne({ where: { ProductID: cartitem.productID } })
                if (!itemproduct) {
                    throw new Error("no product found")
                }
                if (quantity > itemproduct.quantity + cartitem.quantity) {
                    throw new Error("the quantity is not enough");
                }
                if (quantity <= itemproduct.quantity + cartitem.quantity) {
                    if (quantity > cartitem.quantity) {
                        itemproduct.quantity = itemproduct.quantity - (quantity - cartitem.quantity)
                        cartitem.quantity = quantity
                        await itemproduct.save()
                        await cartitem.save()

                    }
                    else {
                        itemproduct.quantity = itemproduct.quantity + (cartitem.quantity - quantity)
                        cartitem.quantity = quantity
                        await itemproduct.save()
                        await cartitem.save()

                    }
                    const changedcart: any = await Cart.findOne({ where: { buyerId: user.id }, include: [{ model: cartItem }] })
                    const Total = gettotal(changedcart)
                    changedcart.Total = Total
                    await changedcart.save()
                    const newcart: any = await Cart.findOne({ where: { buyerId: user.id }, include: [{ model: cartItem }] })


                    res.status(200).json({
                        statusCode: 200,
                        message: "updated quantity",
                        cart: newcart,

                    })
                }
                else {
                    throw new Error("quantity not available");
                }
            } else {
                throw new Error("invalid request");

            }
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })

        }
    }
    static async viewCart(req: Request, res: Response) {
        try {
            const buyer: any = req.user
            const cart: any = await Cart.findOne({ where: { buyerId: buyer.id }, include: [{ model: cartItem }] })
            if (cart) {
                res.status(200).json({
                    statusCode: 200,
                    message: "cart data",
                    cart
                })
            }
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message

            })


        }

    }

    static async clearcart(req: Request, res: Response) {
        const user: any = req.user
        try {
            const cart: any = await Cart.findOne({ where: { buyerId: user.id }, include: [{ model: cartItem }] })
            if (cart) {
                const items: any = cart.CartItems
                interface CartItem {
                    id: number;
                    productID: number;
                    price: number;
                    ProductName: string;
                    image: string;
                    cartId: string;
                    quantity: number;
                }
                if (items.length > 0) {
                    await items.forEach(async (element: CartItem) => {
                        const product: any = await Product.findOne({ where: { ProductID: element.productID } })
                        product.quantity = product.quantity + element.quantity
                        await cartItem.destroy({ where: { id: element.id } })
                        await product.save()

                    });

                    await Cart.update({ Total: 0 }, { where: { id: cart.id } })
                    const newcart: any = await Cart.findOne({ where: { buyerId: user.id }, include: [{ model: cartItem }] })

                    res.status(200).json({
                        statusCode: 200,
                        message: "cart has bee cleared",
                        newcart
                    })
                }
                else {
                    throw new Error("your cart is already empty");

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
export default CART