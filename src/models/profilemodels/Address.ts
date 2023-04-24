import { DataTypes } from "sequelize";
import { sequelizedb } from "../../db/database";
// import countrylist from "country-data-list"

// console.log(countrylist.languages.all)
// const countries = countrylist.countries


const Address = sequelizedb.define('Addresses',{
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stateOrProvince: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipOrPostalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country:  {
        type: DataTypes.STRING,
        allowNull: true,       
    },
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id'
        }}

})
Address.sync()
export default Address
