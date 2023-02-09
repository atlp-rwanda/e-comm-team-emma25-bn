import express, {Application} from 'express'
import authRoutes from '../routes/authroutes'

function createServer () {
    const app: Application = express()

    app.use(express.json())
    app.use(authRoutes)

    return app
}

export default createServer