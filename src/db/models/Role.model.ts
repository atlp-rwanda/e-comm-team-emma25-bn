import { sequelizedb } from "../database";
import { DataTypes } from "sequelize";
const ROLE = sequelizedb.define("role", {
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
ROLE.sync();
export default ROLE;
