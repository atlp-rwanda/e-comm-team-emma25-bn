import CART from "../controllers/cart.contoller";
import express from "express"
import verifyToken from "../middlewares/verifyToken";

const Cartrouter = express.Router()


Cartrouter.post("/add/:productID", verifyToken, CART.addto)

export default Cartrouter 