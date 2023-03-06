import { sequelizedb } from "../database";
import { DataTypes } from "sequelize";
import USER from "../../models/User";

const PRODUCT = sequelizedb.define("product", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: USER,
            key: "id",
        },
        allowNull: false,
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

export default PRODUCT;
