import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TextField
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './SignInStyle';
import { login } from '../../service/AuthService';
import {
  setPassword,
  setEmail,
  setRememberme,
  setRole_Id,
  setEmailToken,
  setEmailOtpToken
} from '../../state/reducer/onboardingSlice';
import { sendEmailOtp } from '../../service/OnboardingService';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password minimum length should be 8').required('Required'),
  email: Yup.string().email('Enter valid email').required('Required')
});
const useStyles = makeStyles(theme => ({
  input: {
    background: '#F5F5F5'
  },
  underline: {
    background: '#F5F5F5'
  }
}));
const SignIn = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const registerSlice = useSelector(state => state.onboardingSliceReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: registerSlice.email,
      password: registerSlice.password,
      rememberme: registerSlice.rememberme
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const sendValue = {
        email: values.email,
        password: values.password,
        rememberme: values.rememberme
      };

      dispatch(setEmail(sendValue.email));
      dispatch(setPassword(sendValue.password));
      dispatch(setRememberme(sendValue.rememberme));

      if (sendValue.rememberme && sendValue.email !== '') {
        localStorage.setItem('rememberMe', sendValue.rememberme);
        localStorage.setItem('user', sendValue.rememberme ? sendValue.email : '');
      }

      if (sendValue.email && sendValue.password) {
        const response = await login(sendValue.email, sendValue.password);
        dispatch(setEmailToken(response.tokens));
        localStorage.setItem('role_Id', response.userRole);

        dispatch(setRole_Id(response.userRole));
        const otpEmail = await sendEmailOtp(sendValue.email, 'email');
        history.push('/EmailOTP');
        addUserToast(sendValue)
          .then(() => {})
          .catch(error => {
            alert({
              message: 'Incorrect email or password',
              type: 'danger'
            });
          });
      }
    }
  });

  const addUserToast = async data => {
    console.log('Toastdata', data);
    if (data) {
      toast.success('OTP Sent to mail');
      // window.location.reload();
    } else {
      toast.error('Failed to send');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('username')) {
      const rememberme = localStorage.getItem('rememberme') === 'true';
      const email = rememberme ? localStorage.getItem('username') : '';

      dispatch(setEmail(localStorage.getItem('username')));
      dispatch(setRememberme(localStorage.getItem('rememberme')));
    }
  }, [localStorage.getItem('username')]);

  const handleClick = e => {
    e.preventDefault();
    history.push('/ForgotPassword');
  };
  const handleOnClick = e => {
    e.preventDefault();
    history.push('/SignUp');
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
            <h3 style={styles.headerStyle}>Sign In to your account</h3>
            <p style={styles.text}>Welcome ! please enter your detail</p>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                style={styles.textStyle}
                variant='outlined'
                name='email'
                placeholder='Enter your email'
                value={formik.values.email ? formik.values.email : registerSlice.email}
                onChange={e => dispatch(setEmail(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img alt='' src='assets/images/mail.png' />
                    </InputAdornment>
                  ),
                  className: classes.input
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
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
                  ),
                  className: classes.input
                }}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <div style={styles.rememberme}>
                <Checkbox
                  style={styles.checkbox}
                  color='primary'
                  type='checkbox'
                  name='rememberme'
                  onChange={formik.handleChange}
                />
                <label>Remember me</label>
              </div>
              <div style={{ marginTop: '-3%' }}>
                <Link style={styles.forgot} onClick={handleClick}>
                  Forgot Password?
                </Link>
              </div>
              <Button type='submit' variant='contained' style={styles.buttonStyle}>
                Sign In
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
export default SignIn;
