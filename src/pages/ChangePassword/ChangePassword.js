import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Grid, Paper, TextField, Button, Checkbox, InputAdornment } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import crypto from 'crypto';
import {
  setDecryptValue,
  setPassword,
  setConfirmPassword,
  setTermsconditions,
  setClear
} from '../../state/reducer/onboardingSlice';
import { toast } from 'react-toastify';
import { preRegister, register } from '../../service/OnboardingService';
import styles from '../ChangePassword/PasswordStyle';
const eye = <FontAwesomeIcon icon={faEye} />;
const passwrapper = {
  position: 'relative',
  display: 'flex',
  marginBottom: 20
};
var CryptoJS = require('crypto-js');

const key = '6fa979f20126cb08aa645a8f495f6d85'; // set random encryption key
const iv = key.slice(0, 16); // set random initialisation vector

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password minimum length should be 8').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password not matched')
    .required('Required'),
  // termsAndConditions: Yup.string().oneOf(['true'], 'Accept terms & conditions')
});

const ChangePassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const paperStyle = { padding: 40, width: '60%', margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const registerSlice = useSelector(state => state.onboardingSliceReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const params = window?.location?.href?.split('+')[1];
    var encrypted_data = params.toString();
    var decipher = crypto.createDecipheriv('aes256', key, iv);
    const encoding = 'base64';
    var result = decipher.update(encrypted_data, encoding);
    result += decipher.final();
    dispatch(setDecryptValue(result));
  }, [window?.location?.href?.split('+')[1]]);

  const formik = useFormik({
    initialValues: {
      password: registerSlice.password,
      confirmPassword: registerSlice.confirmPassword,
      termsAndConditions: registerSlice.termscondition
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const sendValue = {
        password: values.password,
        confirmedpassword: values.confirmPassword,
        termsconditions: values.termsAndConditions
      };
      dispatch(setPassword(sendValue.password));
      dispatch(setConfirmPassword(sendValue.confirmedpassword));
      dispatch(setTermsconditions(sendValue.termsAndConditions));

      if (registerSlice.decryptValue) {
        await preRegister(registerSlice.decryptValue, sendValue.password);
        addUserToast();
      }
    }
  });
  const addUserToast = () => {
    dispatch(setClear(''));
    toast.success('Registration successfully added');
    history.push('/SignIn');
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Grid className='col-md-12 row-container'>
        <div style={styles.papernewStyle}>
          <Grid align='center' className='col-md-6'>
            <img alt='' src='assets/images/Cover.png' style={styles.image} />
          </Grid>
        </div>
        <Paper style={styles.paperStyle}>
          <Grid align='center' class='col-md-6'>
            <h3 style={styles.passwordHeader}>Set up password</h3>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                style={styles.textStyle}
                variant='outlined'
                type={passwordShown ? 'text' : 'password'}
                name='password'
                placeholder='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img alt='' src='assets/images/lock.png' />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      {passwordShown ? (
                        <img
                          alt=''
                          src={'assets/images/Vector.png'}
                          onClick={togglePasswordVisiblity}
                        />
                      ) : (
                        <img
                          alt=''
                          src={'assets/images/eye-off.png'}
                          onClick={togglePasswordVisiblity}
                        />
                      )}
                    </InputAdornment>
                  )
                }}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                style={styles.textStyle}
                variant='outlined'
                type={passwordShown ? 'text' : 'password'}
                name='confirmPassword'
                placeholder='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img alt='' src='assets/images/lock.png' />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      {passwordShown ? (
                        <img
                          alt=''
                          src={'assets/images/Vector.png'}
                          onClick={togglePasswordVisiblity}
                        />
                      ) : (
                        <img
                          alt=''
                          src={'assets/images/eye-off.png'}
                          onClick={togglePasswordVisiblity}
                        />
                      )}
                    </InputAdornment>
                  )
                  // className: classes.input
                }}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              {/* <div style={{ marginRight: '14%', marginTop: '2%' }}>
                <Checkbox
                  type='checkbox'
                  color='primary'
                  name='termsAndConditions'
                  onChange={formik.handleChange}
                />
                <label>I have read and agree to the Terms</label>
                {formik.touched.termsAndConditions && formik.errors.termsAndConditions ? (
                  <div style={styles.termsError}>{formik.errors.termsAndConditions}</div>
                ) : null}
              </div> */}
              <Button type='submit' variant='contained' style={styles.buttonStyle}>
                Continue
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
export default ChangePassword;
