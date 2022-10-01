import React, { useState } from 'react';
import { Button, Grid, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setEmail } from '../../state/reducer/onboardingSlice';
import { checkEmailAlreadyExists, sendOtp } from '../../service/OnboardingService';
import { toast } from 'react-toastify';
import styles from './ForgotStyle'
const validationSchema = Yup.object().shape({
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
const ForgotPassword = () => {
  const registerSlice = useSelector(state => state.onboardingSliceReducer);
  const [emailval, setEmailval] = useState(registerSlice.email);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();


  const formik = useFormik({
    initialValues: {
      email: registerSlice.email
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const sendValue = {
        email: values.email
      };
      dispatch(setEmail(sendValue.email));

      const response = await Promise.all([checkEmailAlreadyExists(sendValue.email.trim())]);

      if (response[0] && response[0]?.exist) {
        if (sendValue.email) {
          await sendOtp(sendValue.email, 'email')
            .then(() => {
              addUserToast(sendValue.email);
              setEmailval('');
              //   history.push('/SignIn')
            })
            .catch(error => {
              alert({
                message: 'Incorrect email ',
                type: 'danger'
              });
            });
        }
      } else {
        toast.error('Please enter valid email');
      }
    }
  });
  const addUserToast = async data => {
    if (data) {
      toast.success('Password Set Link Sent to mail', 500);
      dispatch(setEmail(''));
      reloadPage(data);
    } else {
      toast.error('Failed to send');
    }
  };
  const reloadPage = data => {
    if (data) {
      window.location.reload();
    }
  };
  const handleClick = e => {
    e.preventDefault();
    history.push('/SignIn');
  };

  return (
       <div style={{overflow:'hidden'}}>
        <Grid className='col-md-12 row-container'>
          <div style={styles.papernewStyle}>
            <Grid align='center' className='col-md-6'>
              <img
                alt=''
                src='assets/images/Cover.png'
                style={styles.image}
              />
            </Grid>
          </div>
          <Paper style={styles.paperStyle}>
            <Grid align='center' class='col-md-6'>
            <h3 style={styles.headerStyle}>Forgot your password</h3>
            <p style={styles.text}>Please enter your email address and we' ll send a link to reset your password</p>

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  style={styles.textStyle}
                  variant='outlined'
                  name='email'
                  placeholder='Enter your email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
                <Button
                  type='submit'
                  variant='contained'
                  style={styles.buttonStyle}
                >
                  Request reset link
                </Button>
              </form>
              <Link
                style={styles.linkStyle}
                onClick={handleClick}
              >
                Back to Sign In
              </Link>
            </Grid>
          </Paper>
        </Grid>
      </div>
  );
};
export default ForgotPassword;
