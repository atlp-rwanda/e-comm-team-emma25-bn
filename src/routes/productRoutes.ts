import { Router } from "express";
import ProductController from "../controllers/prodController";
import { roleAuthorization } from "../middlewares/role.middleware";
import validateProductID from "../middlewares/productValidation";
import verifyToken from "../middlewares/verifyToken";

const prod = Router();
prod.post("/add", ProductController.saveProduct);
// seller manage their product availbility
prod.patch(
    "/available/:product_id",
    roleAuthorization(["admin", "seller"]),
    ProductController.updateProductAvailability
);

// seller delete their product
prod.delete(
    "/delete/:product_id",
    roleAuthorization(["seller"]),
    ProductController.deleteOneProduct
);

prod.post(
    "/wishlist/add/:id",
    verifyToken,
    validateProductID,
    ProductController.addToWishlist
);

export default prod;
