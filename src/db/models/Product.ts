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
    ProductDesc: DataTypes.TEXT('long'),
    ProductOwner: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Product.sync();

export default Product