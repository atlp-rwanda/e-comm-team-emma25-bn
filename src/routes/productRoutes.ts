import { Router } from "express";
import ProductController from "../controllers/prodController";
import { roleAuthorization } from "../middlewares/role.middleware";
import validateProductID from "../middlewares/productValidation";
import verifyToken from "../middlewares/verifyToken";

const prod = Router();
prod.post("/add", ProductController.saveProduct);
prod.patch("/update/:id", ProductController.updateProduct);
prod.get("/allSellerCollection", ProductController.getAllSellerProducts);
prod.get("/search", ProductController.searchProducts);
prod.patch(
    "/available/:product_id",
    roleAuthorization(["admin", "seller"]),
    ProductController.updateProductAvailability
);

prod.post(
    "/wishlist/add/:id",
    verifyToken,
    validateProductID,
    ProductController.addItem
);
prod.get('/wishlist/view', verifyToken, ProductController.viewWishlist)
prod.get("/", ProductController.getAllProducts);

prod.get(
    "/:productId",
    roleAuthorization(["user", "seller", "admin"]),
    ProductController.getOneProduct
);

prod.delete("/delete/image/:id", verifyToken, validateProductID, ProductController.delProductImage)

export default prod;
