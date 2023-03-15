import { Router } from "express";
import ProductController from "../controllers/prodController";
import { roleAuthorization } from "../middlewares/role.middleware";

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

export default prod;
