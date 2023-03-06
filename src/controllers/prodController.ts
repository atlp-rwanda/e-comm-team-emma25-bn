import { Request, Response } from "express"
import { MulterError } from "multer"
import { decode } from "../helper/jwtTokenize"
import shortUniqueId from "short-unique-id"
import multipleUploader from "../middlewares/fileUploader"
import Images from "../db/models/Image"
import Product from "../db/models/Product"

Product.hasMany(Images, { foreignKey: 'ProductID' })
Images.belongsTo(Product, { foreignKey: 'ProductID' })

const uids = new shortUniqueId({ length: 12 });

class ProductController {
    static async saveProduct(req: Request, res: Response) {
        const jwt = req.cookies.jwt || req.body.token || req.query.jwt;
        const bToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

        if (jwt || bToken != '') {
            const userData: any = decode(jwt || bToken);
            if (userData.role != "seller") {
                return res.status(403).json({ status: 403, message: "You should login as a seller to add a product." })
            }
            multipleUploader(req, res, async function (err) {
                if (err instanceof MulterError) {
                    res.status(400).json({ status: 400, message: err.message })
                } else if (err) {
                    return res.status(400).json({ status: 400, error: "File conflicts", message: "Please upload only jpg, jpeg, png, webp image files." })
                }
                if (req.files) {
                    const ProductID: string = uids();
                    const ProductName: string = req.body.pname
                    const ProductPrice: string = req.body.p_price
                    const ExpiryDate: string = req.body.edate
                    const ProductOwner: string = userData.id
                    const ProductCategory: string = req.body.category
                    const files = req.files;
                    const { imgs }: any = files
                    const totalFiles = imgs.length
                    for (let i = 0; i < totalFiles; i++) {
                        const img = imgs[i];
                        const fileType = img.mimetype;
                        const fullPath = req.protocol + '://' + req.hostname + '/' + img.destination + '/' + img.filename;
                        Images.create({
                            ImageID: uids(),
                            ImagePath: fullPath,
                            ImageType: fileType,
                            ProductID
                        });
                    }
                    try {
                        const prd = await Product.create({
                            ProductID,
                            ProductName,
                            ProductPrice,
                            ProductCategory,
                            ExpiryDate,
                            ProductOwner
                        })
                        const imgs = await Images.findAll({where: {ProductID}})
                        res.status(201).json({ status: 201, message: "Product image and details are saved.", productData: prd , ImageDetails: imgs})
                    } catch (error) {
                        res.status(400).json({ status: 400, message: error })
                    }

                }
            })
        } else {
            return res.status(404).json({ status: 404, message: "User token not found! try logging in." })
        }
    }
}

export default ProductController