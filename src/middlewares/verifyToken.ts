/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
dotenv.config();

interface User {
  id: number;
  email: string;
  role: string;
  phone: string,
  name: string;
}
export interface CustomRequest extends Request {
  users?: User;
  [key: string]: any;
}

const verifyToken: RequestHandler<CustomRequest> = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"] as string;
    const tokenCookie = req.cookies.token
    if (token || tokenCookie) {
      let auth: string;
      if (tokenCookie) {
        auth = tokenCookie;
      } else {
        auth = token.split(" ")[1];
      }
      if (!auth) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded: any = jwt.verify(auth, process.env.JWT_SECRET as string);
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          phoneNumber: decoded.phone,
          name: decoded.name
        };
        next();
      } catch (err: any) {
        res.status(406).json({
          statusCode: 406,
          message: err.message,
        });
      }
    } else {
      res.status(401).json({
        statusCode: 401,
        message: "you are not logged",
      });
    }
  } catch (error) {
    return res.status(403).send("Token not provided");
  }
};

export default verifyToken;
