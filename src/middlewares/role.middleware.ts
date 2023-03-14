import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decode } from "../helper/jwtTokenize";

interface CustomRequest extends Request {
    userData?: any;
}

export const roleAuthorization = (allowedRoles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const bToken = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : "";

        if (bToken != "") {
            req.userData = decode(bToken); /**  **/
            if (allowedRoles.includes(req.userData.role)) {
                next();
            } else {
                return res.status(200).json({
                    status: 403,
                    message: "You are not authorized.",
                });
            }
        } else {
            return res.status(403).json({
                status: 403,
                message: "PLEASE LOGIN TO CONTINUE.",
            });
        }
    };
};
