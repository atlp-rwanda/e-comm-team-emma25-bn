import User from "../models/User";
import bcrypyt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { any } from "joi";

class GoogleController {
  static async googleAuth(req: any, res: any) {
    try {
      await User.findOne({
        where: {
          email: req.user.email,
        },
      }).then(async (result: any) => {
        if (result) {
          res.status(200).json({
            success: true,
            user: {
              id: result.id,
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              token: generateToken(result),
            },
          });
        } else {
          const salt = await bcrypyt.genSalt(10);
          const rand = randomUUID();
          const hashpassword = await bcrypyt.hash(generateToken(rand), salt);
          const user: any = await User.create({
            firstName: req.user.name.givenName,
            lastName: req.user.name.familyName,
            email: req.user.email,
            password: hashpassword,
          });
     
          await user.save();
          return res.status(200).json({ user: user });
        }
      });
          
      return res;
    } catch (error) {
      return res.status(500).json({ status: 500, error: error });
    }
  }
}

const generateToken = (user: any) => {
  return jwt.sign({ user }, "my-token-secret", { expiresIn: "30d" });
};
export default GoogleController;
