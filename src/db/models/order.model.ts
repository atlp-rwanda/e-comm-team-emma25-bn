import {  DataTypes } from 'sequelize';
import { sequelizedb } from "../database"
import User from "../../models/User";


const  Order =  sequelizedb.define( "orders",
    {
      Orderid: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      expectedDeliveryDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      paymentid:{
        type: DataTypes.STRING,
        allowNull: true, 
      },
      status :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn:{
            args: [["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded", "On hold", "Backordered", "Partially shipped", "Payment declined"]
          ],
            msg: `Must be in ("Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded", "On hold", "Backordered", "Partially shipped", "Payment declined")`
          } 
            }
         },
          },
    {
      tableName: 'orders'    
    },
  );
  
  Order.belongsTo(User);
  User.hasMany(Order);  
  Order.sync({alter: true})


  
  export default Order;