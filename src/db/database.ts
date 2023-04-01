import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();
/*I used the cloud database for connecting
so the connection below uses connection string 
*/

export const sequelizedb = new Sequelize(process.env.DBLINK as string, {    
    dialectOptions: {
        ssl: {
      require: true,
      rejectUnauthorized: false,

        },
        native: true,
    },
    logging: false,
});

// the code below will connect to the database
const connectdb = async () => {
    try {
        sequelizedb.authenticate();
        console.log("connected to database successfully");
    } catch (error) {
        console.error("failed to connect to the database :", error);
    }
};

export default connectdb;
