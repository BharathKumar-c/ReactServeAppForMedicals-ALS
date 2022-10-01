import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config';

const createToken = (
  user: UserAttributesType,
  type: token_type = 'access_token'
) => {
  console.log('createToken calling');

  const secret =
    type === 'access_token'
      ? JWT_CONFIG.JWT_SECRET_FOR_ACCESS_TOKEN
      : JWT_CONFIG.JWT_SECRET_FOR_REFRESH_TOKEN;

  const expiry =
    type === 'access_token'
      ? JWT_CONFIG.JWT_ACCESS_TOKEN_EXPIRY_SECONDS
      : JWT_CONFIG.JWT_REFRESH_TOKEN_EXPIRY_SECONDS;

  let payload: any = {
    iss: JWT_CONFIG.JWT_ISSUER,
    email: user.email,
    userId: user.userId
  };

  return jwt.sign(payload, secret!, { expiresIn: expiry });
};

const generateUserTokens = (user: UserAttributesType) => {
  try {
    const access_token = createToken(user);
    const refresh_token = createToken(user, 'refresh_token');
    return { access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token: string, type: token_type = 'access_token') => {
  const secret =
    type === 'access_token'
      ? JWT_CONFIG.JWT_SECRET_FOR_ACCESS_TOKEN
      : JWT_CONFIG.JWT_SECRET_FOR_REFRESH_TOKEN;

  return new Promise((resolve, reject) => {
    return jwt.verify(token, secret!, async (err, payload) => {
      if (err) {
        return reject(err); // the err contains JWT error data
      }
      return resolve(payload);
    });
  });
};

export default { createToken, generateUserTokens, verifyToken };
