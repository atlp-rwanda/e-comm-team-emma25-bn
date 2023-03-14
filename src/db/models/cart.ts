import { sequelizedb } from "../database"
import { DataTypes } from "sequelize"
import USER from "../../models/User";

const Cart = sequelizedb.define('Cart', {
    buyerId:{
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
    images : {
        type: DataTypes.STRING
    }    
})
USER.hasOne( Cart , { foreignKey: 'buyerId', as: 'user' });
Cart.belongsTo(USER, {onDelete: "cascade", foreignKey: 'buyerId'})


Cart.sync().then(()=>{
    console.log("");
    
})




export default Cart
