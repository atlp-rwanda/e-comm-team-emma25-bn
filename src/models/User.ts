import {sequelizedb} from '../db/database'
import {DataTypes, HasMany} from 'sequelize'
import bcrypt from 'bcrypt'
import Profile from './profilemodels/profile'
import Role from '../db/models/Role'
const USER = sequelizedb.define('user', {
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
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2, // <-- the default value to 2(user)
    references: {
      model: 'roles',
      key: 'id',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      // this function is to hash the password before saving it.
      this.setDataValue(
        'password',
        bcrypt.hashSync(value, bcrypt.genSaltSync()),
      )
    },
  },
})
USER.sync()
USER.belongsTo(Role, {foreignKey: 'roleId'})
Role.hasMany(USER)

USER.hasOne(Profile, {foreignKey: 'userId', as: 'profile'})
Profile.belongsTo(Profile, {foreignKey: 'userId'})
export default USER
