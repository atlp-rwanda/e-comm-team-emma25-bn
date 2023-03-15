import { sequelizedb } from "../database"
import { DataTypes } from "sequelize"
import USER from "../../models/User";
import cartItem from "./cartItems";

const Cart = sequelizedb.define('carts',{   
    buyerId:{
        type: DataTypes.INTEGER,
            }, 
    Total: {
        type: DataTypes.DOUBLE,
        allowNull: false,        
        defaultValue: 0
    },
  
})



USER.hasOne( Cart,{ foreignKey: 'buyerId'});
Cart.belongsTo(USER, {onDelete: "cascade"})
Cart.hasMany(cartItem, {onDelete: "cascade", foreignKey:'cartId'})
cartItem.belongsTo(Cart, {onDelete: "cascade"})

Cart.sync()

export default Cart
