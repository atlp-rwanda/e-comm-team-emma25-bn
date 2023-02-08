import { DataTypes } from "sequelize";
import Product from "./Product"
import { sequelizedb } from "../database"

const ProductImages = sequelizedb.define('pro_images', {
    ImageID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ImagePath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ImageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProductID: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

ProductImages.sync();

Product.hasMany(ProductImages, { foreignKey: 'ProductID' })
ProductImages.belongsTo(Product, { foreignKey: 'ProductID' })

export default ProductImages