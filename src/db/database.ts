import {Sequelize} from "sequelize"
import { config } from "dotenv"
config()
/*I used the cloud database for connecting
so the connection below uses connection string 
*/

export const sequelizedb = new Sequelize( process.env.DBLINK as string,
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
          ssl: true,
          native:true
        }
      } )


      // the code below will connect to the database 
      const connectdb = async ()=>{
        try {
            sequelizedb.authenticate()
            console.log('conneced to database successfully')            
        } catch (error) {
            console.error('failed to connect to the database :', error);
        }
      }

      export default connectdb