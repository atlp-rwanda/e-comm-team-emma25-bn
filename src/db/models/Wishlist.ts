import { sequelizedb } from "../database";
import { DataTypes } from "sequelize";
import USER from "../../models/User";
import Product from "./Product"

const Wishlist = sequelizedb.define("wishlist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

Product.belongsToMany(USER, { through: Wishlist, foreignKey: 'ProductID' })
USER.belongsToMany(Product, { through: Wishlist })
Wishlist.sync()

export default Wishlist;
