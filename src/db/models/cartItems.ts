import { sequelizedb } from "../database"
import { DataTypes } from "sequelize"
import Cart from "./cart"

const cartItem = sequelizedb.define('Cartitem',{
    cartId:{
        type: DataTypes.STRING,
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
    }    
})

cartItem.belongsTo(Cart, {onDelete: "cascade"})


cartItem.sync().then(()=>{
    console.log("")
})

export default cartItem

