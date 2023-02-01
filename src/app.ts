import express, {Application} from 'express'
import { config } from 'dotenv'
const app:Application = express()
config()

console.log('Hello Team emma This backend API')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));