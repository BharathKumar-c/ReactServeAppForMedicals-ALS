import bcrypt from 'bcrypt';
import JWTService from './jwt.service';
import db from '../model';
import { hashText } from '../util';

const { User } = db;

const { generateUserTokens, verifyToken, createToken } = JWTService;

const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  citizenship,
  country,
  phone
}: UserAttributesType) => {
  try {
    const hashedPassword = await hashText(password);
    return await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      citizenship,
      country,
      phone
    });
  } catch (error) {
    throw error;
  }
};

const checkEmailExists = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return !!user;
  } catch (error) {
    return false;
  }
};

const checkPhoneExists = async (phone: string) => {
  try {
    const user = await User.findOne({ where: { phone } });
    return !!user;
  } catch (error) {
    return false;
  }
};

const checkUserCredentials = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error('User does not exist');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const tokens = generateUserTokens(user);
      return tokens;
    } else {
      throw Error('Invalid Email or Password');
    }
  } catch (error) {
    throw error;
  }
};

const generateAccessTokenByRefreshToken = async (refresh_token: string) => {
  try {
    const payload: any = await verifyToken(refresh_token, 'refresh_token');
    const data: UserAttributesType = {
      email: payload?.email,
      userId: payload.userId
    };
    const access_token = await createToken(data);
    return { access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  checkEmailExists,
  checkUserCredentials,
  generateAccessTokenByRefreshToken,
  checkPhoneExists
};
