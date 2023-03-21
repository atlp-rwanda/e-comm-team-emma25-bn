import { Request, Response } from "express";
import { MulterError } from "multer";
import { decode } from "../helper/jwtTokenize";
import shortUniqueId from "short-unique-id";
import multipleUploader from "../middlewares/fileUploader";
import Images from "../db/models/Image";
import Product from "../db/models/Product";
import Wishlist from "../db/models/Wishlist";
import { Op } from "sequelize";

const uids = new shortUniqueId({ length: 12 });
class ProductController {
    static async saveProduct(req: Request, res: Response) {
        const jwt = req.cookies.token;
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
                    const quantity: number = req.body.quantity;
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
                                quantity,
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

    // GET ALL SELLER'S PRODUCTS
    static async getAllSellerProducts(req: Request, res: Response) {
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
                    message: "You should login as a seller to view products.",
                });
            }
            try {
                const products = await Product.findAll({
                    where: { ProductOwner: userData.id.toString() },
                    include: [Images],
                });
                res.status(200).json({
                    status: 200,
                    message: "All seller's products are fetched successfully",
                    products,
                });
            } catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "Something went wrong while fetching products",
                    error,
                });
            }
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
                if (checkProduct.ProductOwner == userData.id) {
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

    // Adding to cart
    static async addToWishlist(req: Request, res: Response) {
        const id: string = req.params.id;
        const loggedUser = req.user;
        const user_id = (loggedUser as any).id;
        // Check product existence
        const checkProduct = await Product.findOne({
            where: { ProductID: id },
            include: [Images],
        });
        if (checkProduct == null) {
            return res.status(404).json({
                status: 404,
                message: "Product provided does not match with any products.",
            });
        } else {
            // Check if the logged in user have already added this product to his/her wishlist
            const checkWish = await Wishlist.findOne({
                where: { ProductID: id, userId: user_id },
            });
            if (checkWish != null) {
                return res.status(409).json({
                    status: 409,
                    message:
                        "The product you chose is already on your wishlist.",
                    product_details: checkProduct,
                });
            } else {
                try {
                    const product_name = (checkProduct as any).ProductName;
                    const addProduct = await Wishlist.create({
                        ProductID: id,
                        userId: user_id,
                    });
                    res.status(202).json({
                        status: 202,
                        message: `${product_name} added to your wish list`,
                        recently_added: checkProduct,
                    });
                } catch (err: any) {
                    res.status(400).json({ status: 400, message: err.message });
                }
            }
        }
    }

    // UPDATE PRODUCT
    static async updateProduct(req: Request, res: Response) {
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
                    message:
                        "You should login as a seller to update a product.",
                });
            }

            const id = req.params.id;
            // console.log(id);
            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid product ID",
                });
            }
            const product = await Product.findOne({
                where: {
                    ProductID: id.toString(),
                    ProductOwner: userData.id.toString(),
                },
                include: [Images],
            });
            // console.log(product)
            if (!product) {
                return res.status(404).json({
                    status: 404,
                    error: "Product not found for the given seller.",
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
                // console.log("Just Passed 1st multipleUploader");
                if (req.files) {
                    const ProductName: string = req.body.pname.replace(
                        req.body.pname[0],
                        req.body.pname[0].toUpperCase()
                    );
                    const ProductPrice: string = req.body.p_price;
                    const ProductDesc: string = req.body.desc;
                    try {
                        const updatedProduct = await product.update({
                            ProductName,
                            ProductPrice,
                            ProductDesc,
                        });
                        // console.log("Just Passed 2nd multipleUploader", updatedProduct.dataValues.ProductName);
                        if (req.files) {
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
                                    ProductID: id,
                                });
                            }
                        }
                        const updatedImages = await Images.findAll({
                            where: { ProductID: id },
                        });
                        res.status(200).json({
                            status: 200,
                            message: "Product image and details are updated.",
                            productData: updatedProduct,
                            ImageDetails: updatedImages,
                        });
                    } catch (error) {
                        res.status(500).json({
                            status: 500,
                            message:
                                "Product update failed due to server error.",
                            error,
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

    // SEARCH PRODUCT
    static async searchProducts(req: Request, res: Response) {
        const query = req.query.q;
        try {
            const products = await Product.findAll({
                where: {
                    [Op.or]: [
                        {
                            ProductName: {
                                [Op.iLike]: `%${query}%`,
                            },
                        },
                        {
                            ProductDesc: {
                                [Op.iLike]: `%${query}%`,
                            },
                        },
                    ],
                },
            });
            res.status(200).json({
                status: 200,
                message:
                    "Products matching the search query are fetched successfully",
                products,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Something went wrong while fetching products",
                error,
            });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        const bToken = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : "";
        const userData: any = decode(bToken);
        const userId = userData.id;
        try {
            if (userData.role == "user" || userData.role == "admin") {
                const allProducts: any = await Product.findAll({
                    include: Images,
                });
                return res.status(200).json({ status: 200, data: allProducts });
            } else if (userData.role == "seller") {
                const sellerProducts: any = await Product.findAll({
                    where: {
                        ProductOwner: String(userId),
                    },
                    include: Images,
                });
                return res.status(200).json({
                    status: 200,
                    message: "PRODUCTS IN YOUR SELLER ACCOUNT COLLECTION",
                    data: sellerProducts,
                });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error });
        }
    }

    static async getOneProduct(req: Request, res: Response) {
        const ProductID = req.params.productId;
        const bToken = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : "";
        const userData: any = decode(bToken);
        const checkProduct: any = await Product.findOne({
            include: Images,
            where: { ProductID },
        });
        if (checkProduct) {
            if (userData.role == "user" || userData.role == "admin") {
                return res
                    .status(200)
                    .json({ status: 200, data: checkProduct });
            } else if (userData.role == "seller") {
                if (checkProduct.ProductOwner == userData.id) {
                    return res.status(200).json({
                        status: 200,
                        message: "THIS PRODUCT IS FROM YOUR SELLER COLLECTION",
                        data: checkProduct,
                    });
                } else {
                    return res.status(200).json({
                        status: 200,
                        message:
                            "THIS PRODUCT IS NOT FROM YOUR SELLER COLLECTION",
                        data: checkProduct,
                    });
                }
            }
        } else {
            return res.status(404).json({
                status: 404,
                Message: `product ${ProductID} not found`,
            });
        }
    }
}

export default ProductController;
