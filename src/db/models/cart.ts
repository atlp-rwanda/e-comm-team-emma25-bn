import { sequelizedb } from "../database"
import { DataTypes } from "sequelize"
import USER from "../../models/User";
import cartItem from "./cartItems";

const Cart = sequelizedb.define('Cart', {   
    Total: {
        type: DataTypes.DOUBLE,
        allowNull: false,        
        },
 
})
USER.hasOne( Cart,{ foreignKey: 'buyerId'});
Cart.belongsTo(USER, {onDelete: "cascade"})

Cart.hasMany(cartItem, {foreignKey: 'cartId'})


Cart.sync().then(()=>{
    console.log("");
    
})

export default Cart
