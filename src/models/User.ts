import { sequelizedb } from '../db/database';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import Profile from './profilemodels/profile';
import Role from '../db/models/Role.model';
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
  emailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      // this function is to hash the password before saving it.
      const salt = bcrypt.genSaltSync(10); // generate a salt with 10 rounds
      this.setDataValue(
        'password',
        bcrypt.hashSync(value, salt), // hash the password with the salt
      );
    },
  },
});

Role.hasMany(USER, {
  foreignKey: 'roleId',
});
USER.belongsTo(Role);

USER.sync();

USER.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(Profile, { foreignKey: 'userId' });

export default USER;
