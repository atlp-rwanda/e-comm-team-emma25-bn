import CART from "../controllers/cart.contoller";
import express from "express"
import verifyToken from "../middlewares/verifyToken";

const Cartrouter = express.Router()


Cartrouter.post("/add/:productID", verifyToken, CART.additem)
Cartrouter.patch("/:cartItemid", verifyToken, CART.updateCart)
Cartrouter.delete("/remove/:cartitemid",verifyToken, CART.removeitem)
Cartrouter.get("/view", verifyToken, CART.viewCart)

export default Cartrouter 