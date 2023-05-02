import {  DataTypes } from 'sequelize';
import { sequelizedb } from "../database"
import User from "../../models/User";


const  Order =  sequelizedb.define( "orders",
    {
      Orderid: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
            args: [["Pending","Paid", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded", "On hold", "Backordered", "Partially shipped", "Payment declined"]
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
  Order.sync()


  
  export default Order;