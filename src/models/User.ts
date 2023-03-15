import { sequelizedb } from "../db/database";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Profile from "./profilemodels/profile";
import Role from "../db/models/Role.model";

const USER = sequelizedb.define("user", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            const salt = bcrypt.genSaltSync(10);
            this.setDataValue(
                "password",
                bcrypt.hashSync(value, salt)
            );
        },
    },
    passwordLastChanged: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true, // This will add createdAt and updatedAt fields to the model
    updatedAt: 'passwordLastChanged' // This will make sure that the updatedAt field is stored in the passwordLastChanged field
});


USER.sync();
Role.hasMany(USER, {
    foreignKey: "roleId",
});
USER.belongsTo(Role);

USER.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(Profile, { foreignKey: "userId" });
export default USER;
