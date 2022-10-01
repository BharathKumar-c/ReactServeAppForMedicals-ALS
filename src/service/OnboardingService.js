import ApiUtil from '../util/ApiUtil';
import { storeAccessToken } from './AuthService';

export const checkEmailAlreadyExists = email => {
  console.log('API email', email);
  return ApiUtil.postWithoutToken('user/auth/emailAlreadyExists', { email });
};

export const checkPhoneAlreadyExists = phone => {
  console.log('API phone', phone);
  return ApiUtil.postWithoutToken('user/auth/phoneAlreadyExists', { phone });
};

export const sendOtp = (value, type) => {
  console.log('API email', type);
  return ApiUtil.postWithoutToken('user/auth/sendOtp', { value, type });
};


export const sendEmailOtp = (value, type) => {
  console.log('API email', type);
  return ApiUtil.postWithoutToken('user/auth/sendEmailOtp', { value, type });
};

export const verifyOtp = (value, type, otp) => {
  return ApiUtil.postWithoutToken('user/auth/verifyOtp', { value, type, otp });
};
export const role = () => {
  return ApiUtil.getWithoutToken('user/auth/role', {});
};

export const getUserId = (id) => {
  return ApiUtil.postWithoutToken('user/auth/getUserId', {id});
};

export const deleteUser = (id) => {
  return ApiUtil.postWithoutToken('user/auth/deleteUser', {id});
};

export const getuser = () => {
  return ApiUtil.getWithoutToken('user/auth/getuser', {});
};

export const site_info = () => {
  return ApiUtil.getWithoutToken('user/auth/site_info', {});
};

export const preRegister = (email, password) => {
  // console.log('API preregister', password)
  console.log('API preregister email', email);
  return ApiUtil.postWithoutToken('user/auth/preRegister', { email, password });
};
// interface RegisterBody {
//   email: string;
//   phoneNumber: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   country: string;
//   citizenship: string;
//   dob: Date;
// }


export const userUpdate = body => {
  console.log('bodyreg', body);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ApiUtil.postWithoutToken('user/auth/updateUser', body);
      resolve('Successfully Updated');
    } catch (error) {
      reject(error);
    }
  });
};
export const register = body => {
  console.log('bodyreg', body);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ApiUtil.postWithoutToken('user/auth/register', body);
      storeAccessToken(response?.token);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });



};
