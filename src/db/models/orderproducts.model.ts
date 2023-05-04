import { DataTypes } from 'sequelize';
import { sequelizedb } from "../database"
import Order from './order.model';
import Product from './Product';


const OrderProduct = sequelizedb.define("orderProducts",
  {
    orderProductID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Orderid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  },
  {
    tableName: 'orderproducts'
  },
);

OrderProduct.belongsTo(Order);
Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);
Product.hasMany(OrderProduct, { foreignKey: 'Orderid' });
OrderProduct.sync()

export default OrderProduct;