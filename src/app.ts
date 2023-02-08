import express, {Application} from 'express'
import passport from 'passport'
import session from 'express-session'
import {config} from 'dotenv'
import swaggerDocs from './docs/swagger'
import connectdb from './db/database'
import authRoutes from './routes/authroutes'

const app: Application = express()
import './config/googlePassport.config'

config()
//middleware section
app.use(
  session({
    secret: `process.env.SECRET`,
    resave: false,
    saveUninitialized: true,
  }),
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

app.use(authRoutes)

console.log('Hello Team emma This backend API')

const PORT = process.env.PORT || 3000

/*called the database connection below */
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  swaggerDocs(app)
  // change this to just port in case someone is listening from 127.0.0.1 instead of localhost
})

export default app 
