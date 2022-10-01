'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributesType> implements UserAttributesType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    userId?: number;
    firstName?: string;
    email?: string;
    lastName?: string;
    country?: string;
    citizenship?: string;
    dob?: Date;
    password!: string;
    isActive!: boolean;
    phone?: string;
    static associate(models: any) {
      // to-do
      // define association here
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      phone: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      citizenship: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATE
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_active'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user'
    }
  );
  return User;
};
