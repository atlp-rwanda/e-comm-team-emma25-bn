import { DataTypes } from 'sequelize';
import { sequelizedb } from "../database";

const  Notification =sequelizedb.define( "notifications",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "sent",
      allowNull: false,
    },
  }
);

Notification.sync()

export { Notification};
