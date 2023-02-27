import express, {Application} from 'express'
import {config} from 'dotenv'
import swaggerDocs from './docs/swagger'
import connectdb from './db/database'
import authRoutes from './routes/authroutes'
<<<<<<< HEAD
import cookieParser from 'cookie-parser'

=======
import profileRoutes from "./routes/profileroutes"
>>>>>>> fb2cfdb620fbbb148adc29129cd841d067dd1d29
const app: Application = express()

config()
//middleware section
app.use(express.json())

app.use(authRoutes)
<<<<<<< HEAD
app.use(cookieParser());
=======
app.use(profileRoutes)
>>>>>>> fb2cfdb620fbbb148adc29129cd841d067dd1d29
console.log('Hello Team emma This backend API')

const PORT = process.env.PORT || 3000

/*called the database connection below */
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  swaggerDocs(app)
  // change this to just port in case someone is listening from 127.0.0.1 instead of localhost
})

export default app 
