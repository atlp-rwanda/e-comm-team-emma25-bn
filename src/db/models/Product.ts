import { DataTypes } from "sequelize";
import { sequelizedb } from "../database";

const Product = sequelizedb.define("Products", {
    ProductID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ProductPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,  
        allowNull: false,      
        defaultValue: 1 //this is to set the quantity of the product        
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Product is available by default
    },
    ProductDesc: DataTypes.TEXT,
    ProductOwner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Product.sync({ alter: true });

export default Product;
