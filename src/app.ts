import {config} from 'dotenv'
import swaggerDocs from './docs/swagger'
import connectdb from './db/database'
import createServer from './utils/server'
const app = createServer()

config()
//middleware section

console.log('Hello Team emma This backend API')

const PORT = process.env.PORT || 3000

/*called the database connection below */
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  swaggerDocs(app)
  // change this to just port in case someone is listening from 127.0.0.1 instead of localhost
})

export default app
