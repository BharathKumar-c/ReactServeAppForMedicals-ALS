import db from '../model';
const { Op } = require('sequelize');

const { User } = db;

const getUserDeatilsById = (userId: number) => {
  return User.findOne({
    where: { userId },
    attributes: { exclude: ['password', 'isActive'] }
  });
};

export default { getUserDeatilsById };
