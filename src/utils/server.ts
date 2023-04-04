import express, { Application } from 'express'
import authRoutes from '../routes/authroutes'
import profileRoutes from '../routes/profileroutes'
import cookieParser from "cookie-parser";
import productRoutes from "../routes/productRoutes";
import Cartrouter from '../routes/cart.routes'
import cors from "cors"
import chatRoutes from "../routes/chatRoutes";
import { config } from 'dotenv';
config()
const allowedOrigins: string[] = [process.env.LOCAL as string, process.env.FRONTEND_HOST as string]
// use the env values to add the appropriate routes 
function createServer() {
    const app: Application = express()
    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use('/products', productRoutes)
    app.use(chatRoutes)
    app.use(authRoutes)
    app.use(profileRoutes)
    app.use('/cart', Cartrouter)
    return app
}

export default createServer
