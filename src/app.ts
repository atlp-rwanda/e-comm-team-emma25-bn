import express from 'express'
import { config } from 'dotenv'
import connectdb from './db/database'
import authRoutes from './routes/authroutes'
const app = express()
config()
//middleware section
app.use(express.json())


app.use(authRoutes)


console.log('Hello Team emma This backend API')

const PORT = process.env.PORT || 3000


/*called the database connection below */
connectdb().then( 
    ()=>{
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
// change this to just port in case someone is listening from 127.0.0.1 instead of localhost
}
)