import express from 'express'
import { config } from 'dotenv'
import connectdb from './db/database'
const app = express()
config()
//middleware section
app.use(express.json())

console.log('Hello Team emma This backend API')

const PORT = process.env.PORT || 3000


/*called the database connection below */
connectdb().then( 
    ()=>{
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
}
)