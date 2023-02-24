import { sequelizedb } from "../db/database";
import {DataTypes} from "sequelize";


const Tokens = sequelizedb.define('token',{
    // this user id will changed based on how the signup was created 
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
    type: DataTypes.DATE,
    defaultValue: Date.now,    
    }
})
Tokens.sync()
export default Tokens