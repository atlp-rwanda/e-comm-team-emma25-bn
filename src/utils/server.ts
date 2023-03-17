import express, {Application} from 'express'
import authRoutes from '../routes/authroutes'
import profileRoutes from '../routes/profileroutes'
import productRoutes from "../routes/productRoutes";
import cookieParser from "cookie-parser";
function createServer () {
    const app: Application = express()

    app.use(express.json())
    app.use(cookieParser())
    app.use('/products', productRoutes)
    app.use(authRoutes)
    app.use(profileRoutes)

    return app
}

export default createServer