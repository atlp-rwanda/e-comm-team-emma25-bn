import { sequelizedb } from "../database";
import { DataTypes } from "sequelize";
import ROLE from "./Role.model";
import PERMISSION from "./Permission.model";
const ROLE_PERMISSION = sequelizedb.define("role_permission", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

ROLE.belongsToMany(PERMISSION, { through: ROLE_PERMISSION });
PERMISSION.belongsToMany(ROLE, { through: ROLE_PERMISSION });

ROLE_PERMISSION.sync()
    .then(() => {
        console.log("permissions connected to roles");
    })
    .catch((err) => {
        console.log(err);
    });
export default ROLE_PERMISSION;
