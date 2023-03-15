import Order from "../db/models/order.model";
import { Request,Response } from "express";
import OrderProduct from "../db/models/orderproducts.model";


class ORDER {
    static async changeStatus(req: Request,res: Response): Promise<void>{
        const orderid = req.params.orderid
        const orderstatus = req.body.status;
        try {
            const order: any = await Order.findOne({where: {id: orderid}})
            if(order){
                order.status = orderstatus
                await order.save()
                res.status(200).json({
                    statusCode: 200,
                    message: `updated order status of order ${order.id} to ${orderstatus}`
                })
            }
            else{
                res.status(404).json({
                    statusCode: 404,
                    message: "Order not found."
                })
            }           
        } catch (error:any) {
            
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })
        }


    }
    static async getallorders(req: Request,res: Response): Promise<void>{        
        try {
            const orders = await Order.findAll({order: [['createdAt', 'DESC']],include: [{model: OrderProduct}]                } )
            res.status(200).json({
                statusCode: 200,
                message: "success",
                orders,
            })
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })
            
        }
    }
    static async getpersonalorders(req: Request,res: Response): Promise<void>{
        try {
            const user:any = req.user 
            const orders: any = await  Order.findAll({where: {userId : user.id},order: [['createdAt', 'DESC']],include: [{model: OrderProduct}],
                })
            if(orders){
                res.status(200).json({
                    statusCode: 200,
                    message: "got all personalorders",
                    orders,
                })                            }
                            else{
                                res.status(404).json({
                                    statusCode: 404,
                                    message: "no current orders"
                                })
                            }
            
            
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                message: error.message
            })

            
        }

    }
    
}

export default ORDER