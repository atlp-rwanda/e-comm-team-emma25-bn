import { sequelizedb } from "../../db/database";
import { DataTypes } from "sequelize";
import countrylist from "country-data-list"


// const countries = countrylist.countries.all



const BillingAddress = sequelizedb.define('BillingAddress',
    {
        streetAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateOrProvince: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipOrPostalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,    
    } ,
     profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }}

})
    BillingAddress.sync()
//billing address
    export default BillingAddress