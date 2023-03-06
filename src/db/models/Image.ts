import { DataTypes } from "sequelize";
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
export default ProductImages