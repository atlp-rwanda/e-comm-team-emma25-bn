'use strict'
import {sequelizedb} from '../database'
import {Model} from 'sequelize'
// const {
//   Model
// } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value: string) {
          this.setDataValue('name', value.toLowerCase())
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'roles',
      underscored: true,
    },
  )

  return Role
}
