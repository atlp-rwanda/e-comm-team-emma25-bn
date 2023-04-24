import {Request,Response,  NextFunction } from "express"
import Joi from "joi"
import JoiDateFactory from "@joi/date"
/* eslint-disable @typescript-eslint/no-explicit-any */

const joi = Joi.extend(JoiDateFactory)

const validateBirthday = (value: string) => {
  const result = joi.date().format('YYYY-MM-DD').max('now').utc().required().validate(value);
  if (result.error) {
    throw new Error('Invalid date format');
  }
  const birthDate = new Date(value);
  const now = new Date();

  const diff = now.getTime() - birthDate.getTime();
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  if (age < 10 || age > 150) {
    throw new Error('Invalid age number you must be older than 10 but younger than 150');
  } 
}
const profileValidator = async (req: Request,res: Response, next: NextFunction)=>{
    try{
   const schema =  Joi.object()
    .keys({
      "profileDetails": {
          "firstName": Joi.string().min(3),
          "lastName": Joi.string().min(3),
          "email": Joi.string().min(3),
          "phoneNumber": Joi.string().min(6),
          "gender": Joi.string(),
          "birthdate": Joi.string().custom(validateBirthday),
          "language": Joi.string().allow('')
        },
        "billingAddress": {
          "streetAddress": Joi.string(),
          "city": Joi.string().allow(''),
          "stateOrProvince": Joi.string(),
          "zipOrPostalCode": Joi.number(),
          "country": Joi.string()
        },
        "address": {
          "streetAddress": Joi.string().allow(''),
          "city": Joi.string().allow(''),
          "stateOrProvince": Joi.string().allow(''),
          "zipOrPostalCode": Joi.number().allow(''),
          "country": Joi.string().allow('')
        }
      }) 
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }       
    next()
}catch(error: any){
    res.status(406).json({
        statusCode: 406,
        message: error.message 
    })
}

}
export default profileValidator