import { sequelizedb } from "../database";
import { DataTypes } from "sequelize";
const PERMISSION = sequelizedb.define("permission", {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value: string) {
            this.setDataValue("name", value.toLowerCase());
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
PERMISSION.sync();
export default PERMISSION;
