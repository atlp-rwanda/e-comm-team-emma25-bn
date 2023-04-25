import { DataTypes } from "sequelize";
import { sequelizedb } from "../database";
import Product from "./Product";
import Wishlist from "./Wishlist";

const WishlistItem = sequelizedb.define('WishlistItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    wishlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Wishlist,
            key: 'id'
        }
    },
    ProductID: {
        type: DataTypes.STRING,
        references: {
            model: Product,
            key: 'ProductID'
        },
        allowNull: false
    }
})
WishlistItem.belongsTo(Product, { foreignKey: 'ProductID' });
WishlistItem.sync();

export default WishlistItem

