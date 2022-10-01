'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<TempEmailPhoneType> implements TempEmailPhoneType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    tempEmailPhoneId?: number;
    type?: string;
    value?: string;
    otp?: string;
    sentTime?: Date;
    token?: string;
    noOfAttempts?: number;
    isVerified?: boolean;
    static associate(models: any) {
      // to-do
      // define association here
    }
  }
  User.init(
    {
      tempEmailPhoneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false
      },
      otp: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING
      },
      noOfAttempts: {
        type: DataTypes.STRING,
        field: 'no_of_attempts',
        defaultValue: 0
      },
      sentTime: {
        type: DataTypes.DATE,
        field: 'sent_time'
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified'
      }
    },
    {
      sequelize,
      modelName: 'TempEmailPhone',
      tableName: 'temp_email_phone'
    }
  );
  return User;
};
