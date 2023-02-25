import { DataTypes } from "sequelize";
import { sequelizedb } from "../../db/database";
import countrylist from "country-data-list"
import BillingAddress from "./BillingAdress";
import Address from "./Address";

// const currencys = countrylist.currencies.all
// const languages = countrylist.languages.all

const Profile = sequelizedb.define('profiles',{
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
        allowNull: false ,
        unique: true 

    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            min: 9,            
        }
    },
     gender: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
      isIn:{
        args: [['male', 'female']],
        msg: "Must be male or female"
      } 
        }
     },
     birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
     },
     language: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "English",
   
     },
     currency: {
        type: DataTypes.STRING,
        allowNull: true,      
        defaultValue: "USD",
     },
     userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }}
         
}, {
    timestamps: true
  })  
Profile.sync()
// billing address 
Profile.hasOne(BillingAddress, { foreignKey: 'profileId', as: 'billingAddress' });
BillingAddress.belongsTo(Profile, { onDelete: "cascade",foreignKey: 'profileId' });
//
Profile.hasOne(Address, { foreignKey: 'profileId', as: 'Address' });
Address.belongsTo(Profile, { onDelete: "cascade", foreignKey: 'profileId' });

export default Profile 