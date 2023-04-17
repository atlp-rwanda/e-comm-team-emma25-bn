import express, { Application } from 'express'
import authRoutes from '../routes/authroutes'
import profileRoutes from '../routes/profileroutes'
import cookieParser from "cookie-parser";
import productRoutes from "../routes/productRoutes";
import Cartrouter from '../routes/cart.routes'
import cors from "cors"
import chatRoutes from "../routes/chatRoutes";
import checkoutRouter from '../routes/checkout.routes';
import orderStatusRoutes from '../routes/orderstatus.routes';
import bodyParser from "body-parser"
import { config } from 'dotenv';
import NotificationRouter from '../routes/notification';
config()
// const allowedOrigins: string[] = [process.env.LOCAL as string, process.env.FRONTEND_HOST as string]
// use the env values to add the appropriate routes 
function createServer() {
    const app: Application = express()
    app.use(cors())
    app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req['rawBody'] = buf;
  },
}));
    app.use(express.json())
    app.use(cookieParser())
    app.use('/products', productRoutes)
    app.use(chatRoutes)
    app.use(authRoutes)
    app.use(profileRoutes)
    app.use('/cart', Cartrouter)
    app.use( checkoutRouter)
    app.use("/orders",orderStatusRoutes)
    app.use(NotificationRouter)
    


    return app
}

export default createServer
