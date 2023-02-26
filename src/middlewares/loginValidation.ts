import {Request, Response, NextFunction} from 'express'
import Joi, {any} from 'joi'

const logiValidation = (req: Request, res: Response, next: NextFunction) => {
  const Schemas = Joi.object().keys({
    password: Joi.string().min(6).max(6).required(),
    email: Joi.string().email().required(),
  })
  const {error} = Schemas.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    })
  }
  next()
}

export default logiValidation
