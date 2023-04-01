import { DataTypes } from "sequelize";
import USER from "../../models/User";
import { sequelizedb } from "../database";

const Messages = sequelizedb.define("messages", {
    msg_content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

USER.hasMany(Messages);
Messages.belongsTo(USER)
Messages.sync();

export default Messages;
