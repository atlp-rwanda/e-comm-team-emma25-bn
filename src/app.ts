import {config} from 'dotenv'
import swaggerDocs from './docs/swagger'
import connectdb from './db/database'
import createServer from './utils/server'
const app = createServer()

config()
//middleware section

const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Hello, use  "/docs" to view the swagger docs'))
/*called the database connection below */
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  swaggerDocs(app)
  // change this to just port in case someone is listening from 127.0.0.1 instead of localhost
})

export default app 
