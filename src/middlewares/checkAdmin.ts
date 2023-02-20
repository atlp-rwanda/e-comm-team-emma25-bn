import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {any, string} from 'joi'
dotenv.config()

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'] as string
  const auth = token.split(' ')[1]

  try {
    const decoded: any = jwt.verify(auth, process.env.JWT_SECRET as string)
    if (decoded.role.toString() != 'admin') {
      return res.status(403).send('Your are not admin')
    }
    // req.user = decoded;

    return next()
  } catch (error) {
    return res.status(403).send('Token not provided')
  }
}

export default isAdmin
