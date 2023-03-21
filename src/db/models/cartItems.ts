import { sequelizedb } from "../database"
import { DataTypes } from "sequelize"

const cartItem = sequelizedb.define('CartItems',{
    cartId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image : {
        type: DataTypes.STRING
    } ,
    quantity:{
        type: DataTypes.INTEGER,  
        allowNull: false,      
        defaultValue: 1        
    }   
})
cartItem.sync();

export default cartItem

