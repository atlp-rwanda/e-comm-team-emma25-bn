import { sequelize } from "../db/database";
import { Sequelize,DataTypes} from "sequelize";
import bcrypt from "bcrypt"
const USER =  sequelize.define('user',
{
    firstName:{
        type : DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type : DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type : DataTypes.STRING,
        allowNull: false,
        set(value : string) {          
            // this function is to hash the password before saving it.
            this.setDataValue('password', bcrypt.hashSync(value , bcrypt.genSaltSync()));
          }      
    }
})

export default USER 