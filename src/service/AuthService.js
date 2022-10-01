import store from '../state/store';
import { setAccessToken, setRefreshToken } from '../state/auth';
import ApiUtil from '../util/ApiUtil';
import localStorage from './locatlStorage';

export const storeAccessToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const registerToken = await localStorage.setSecureValue('token', JSON.stringify(token));
      console.log("regpre",registerToken)
      store.dispatch(setAccessToken(token?.access_token));
      store.dispatch(setRefreshToken(token?.refresh_token));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const login = (email, password) => {
  console.log('logapi', email)
  console.log('logapipwd',password)

  return new Promise(async (resolve, reject) => {
    try {
      const token = await ApiUtil.postWithoutToken('user/auth/login', {
        email,
        password,
      });
      storeAccessToken(token);
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

