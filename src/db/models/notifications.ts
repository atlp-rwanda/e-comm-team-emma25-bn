import { DataTypes } from 'sequelize';
import { sequelizedb } from "../database";

const  Notification =sequelizedb.define( "notifications",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "sent",
      allowNull: false,
    },
  }
);

Notification.sync({alter: true})

export { Notification};
