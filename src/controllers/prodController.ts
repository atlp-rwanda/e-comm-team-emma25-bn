import { Request, Response } from "express";
import { MulterError } from "multer";
import { decode } from "../helper/jwtTokenize";
import shortUniqueId from "short-unique-id";
import multipleUploader from "../middlewares/fileUploader";
import Images from "../db/models/Image";
import Product from "../db/models/Product";

const uids = new shortUniqueId({ length: 12 });
class ProductController {
    static async saveProduct(req: Request, res: Response) {
        const jwt =
            req.cookies.jwt ||
            req.body.token ||
            req.query.jwt ||
            req.cookies.token;
        const bToken = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : "";

        if (jwt || bToken != "") {
            const userData: any = decode(jwt || bToken);
            if (userData.role != "seller") {
                return res.status(403).json({
                    status: 403,
                    message: "You should login as a seller to add a product.",
                });
            }
            multipleUploader(req, res, async function (err) {
                if (err instanceof MulterError) {
                    res.status(400).json({ status: 400, message: err.message });
                } else if (err) {
                    return res.status(400).json({
                        status: 400,
                        error: "File conflicts",
                        message:
                            "Please upload only jpg, jpeg, png, webp image files.",
                    });
                }
                if (req.files) {
                    const ProductID: string = uids();
                    const ProductName: string = req.body.pname.replace(
                        req.body.pname[0],
                        req.body.pname[0].toUpperCase()
                    );
                    const ProductPrice: string = req.body.p_price;
                    const ProductOwner: string = userData.id;
                    const ProductDesc: string = req.body.desc;
                    const checkProduct = await Product.findOne({
                        where: { ProductName },
                        include: [Images],
                    });
                    if (checkProduct == null) {
                        try {
                            const prd = await Product.create({
                                ProductID,
                                ProductName,
                                ProductPrice,
                                ProductDesc,
                                ProductOwner,
                            });
                            const files = req.files;
                            const { imgs }: any = files;
                            const totalFiles = imgs.length;
                            for (let i = 0; i < totalFiles; i++) {
                                const img = imgs[i];
                                const fileType = img.mimetype;
                                const fullPath =
                                    req.protocol +
                                    "://" +
                                    req.hostname +
                                    "/" +
                                    img.destination +
                                    "/" +
                                    img.filename;
                                await Images.create({
                                    ImageID: uids(),
                                    ImagePath: fullPath,
                                    ImageType: fileType,
                                    ProductID,
                                });
                            }
                            const uploadedImages = await Images.findAll({
                                where: { ProductID },
                            });
                            res.status(201).json({
                                status: 201,
                                message: "Product image and details are saved.",
                                productData: prd,
                                ImageDetails: uploadedImages,
                            });
                        } catch (error) {
                            res.status(200).json({
                                status: 200,
                                message:
                                    "Product is saved with no images or other error",
                                error,
                            });
                        }
                    } else {
                        res.status(409).json({
                            status: 409,
                            message: "Product already exists",
                            suggests: "You can update product instead.",
                            existing_product: checkProduct,
                        });
                    }
                }
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "User token not found! try logging in.",
            });
        }
    }

    // PRODUCT AVAILABILITY
    static async updateProductAvailability(req: Request, res: Response) {
        try {
            const ProductID = req.params.product_id;
            const available = req.body.isAvailable;
            if (typeof available === "boolean") {
                res.status(400).json({
                    statusCode: 400,
                    message: "Use true or false for avalilable",
                });
            }
            const bToken = req.headers.authorization
                ? req.headers.authorization.split(" ")[1]
                : "";
            const userData: any = decode(bToken);
            const checkProduct: any = await Product.findOne({
                where: { ProductID },
            });
            if (checkProduct && userData) {
                console.log(checkProduct);
                console.log(userData);
                if (checkProduct.ProductOwner == userData.id) {
                    console.log("YOU OWN THIS PRODUCT");
                    const updatedProduct = await Product.update(
                        { available },
                        {
                            where: {
                                ProductID,
                            },
                        }
                    );
                    return res.status(201).json({
                        statusCode: 201,
                        message: "product updated successfully",
                        data: updatedProduct,
                    });
                } else {
                    return res.status(403).json({
                        statusCode: 403,
                        message:
                            "you can not authorised to update other people's products",
                    });
                }
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    message: `product with id ${ProductID} does not exist`,
                });
            }
        } catch (error) {
            return res.json({
                statusCode: 400,
                message: error,
            });
        }
    }
}

export default ProductController;
