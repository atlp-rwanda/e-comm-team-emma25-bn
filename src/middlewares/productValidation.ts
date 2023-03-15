import joi from "joi"
import { Request, Response, NextFunction } from "express"

const validateProductID = (req: Request, res: Response, next: NextFunction) => {
    const Schema = joi.object().keys({
        id: joi.string().required().min(12).max(12)
    });
    const { error } = Schema.validate(req.params)
    if (error) {
        return res.status(400).json({ status: 400, message: "Validation Error", error_message: error.details[0].message })
    }
    next();
}

export default validateProductID;