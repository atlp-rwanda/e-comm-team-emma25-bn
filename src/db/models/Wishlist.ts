import { sequelizedb } from "../database";
import { DataTypes } from "sequelize";
import USER from "../../models/User";
import WishlistItem from "./WishlistItem";

const Wishlist = sequelizedb.define("wishlist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

USER.hasOne(Wishlist);
Wishlist.belongsTo(USER, { onDelete: "cascade" })
Wishlist.hasMany(WishlistItem, { onDelete: "cascade", foreignKey: 'wishlistId' })
WishlistItem.belongsTo(Wishlist, { onDelete: "cascade" })

Wishlist.sync();
export default Wishlist;
