import { DataTypes } from "sequelize"
import { sequelizedb } from "../database"

const Product = sequelizedb.define('Products', {
    ProductID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProductPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    ProductCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ExpiryDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProductOwner: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Product.sync();

export default Product