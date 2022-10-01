import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import styles from '../EmailOTP/OTPStyle';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setEmailOtpToken } from '../../state/reducer/onboardingSlice';
import { sendEmailOtp, verifyOtp } from '../../service/OnboardingService';

const EmailOTP = props => {
  const [OTP, setOTP] = useState('');
  const [counter, setCounter] = useState(60);
  const registerSlice = useSelector(state => state.onboardingSliceReducer);
  const [email, setEmail] = useState(registerSlice.email);
  const [clear, setClear] = useState('');
  const [emailVerify, setEmailverify] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const verifyOTPfind = async () => {
    if (email) {
      setClear('');
      await verifyOtp(email, 'email', OTP)
        .then(otpEmailVerify => {
          console.log(otpEmailVerify, 'otpverisythen');
          setEmailverify(true);
          dispatch(setEmailOtpToken(otpEmailVerify.token));
          localStorage.setItem('token', otpEmailVerify.token);
          addUserToast(otpEmailVerify.token);
          history.push('/Dashboard');
        })
        .catch(err => {
          if (err?.response?.status === 400) {
            setErrorEmail(err?.response?.data?.message);
            setEmailverify(false);
          } else {
            setErrorEmail('UnKnown Error');
            setEmailverify(false);
          }
        });
    }
  };
  const addUserToast = async data => {
    console.log('Toastdata', data);
    if (data) {
      toast.success(' Successfully Verified ');
      // window.location.reload();
    } else {
      toast.error('Failed to send');
    }
  };
  const resendOTP = async () => {
    console.log('resend===');
    try {
      if (email) {
        await sendEmailOtp(email, 'email');
        addResendToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addResendToast = async data => {
    console.log('Toastdata', data);
    if (data) {
      toast.success('OTP Sent to mail');
      // window.location.reload();
    } else {
      toast.error('Failed to send');
    }
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
            <h3 style={styles.headerStyle}>Enter Email OTP</h3>
          </Grid>
          <div
            style={{
              alignItems: 'center',
              marginTop: '5%',
              marginLeft: '35%'
            }}
          >
            <div>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={4}
                otpType='number'
                disabled={false}
                //   secure
              />
              {errorEmail ? <div style={styles.errorEmail}>{errorEmail} </div> : null}
              <div style={{ flexDirection: 'row' }}>
                <div style={styles.sentCodemsg}>
                  We sent code to
                  <p style={styles.emailStyle}>{email}</p>
                </div>
              </div>
              <div flexDirection='row'>
                <p style={styles.didntReceive}>Didn’t receive?</p>
                {counter !== 0 ? (
                  <div
                    style={styles.resendDisable}
                  >
                    Resend OTP
                  </div>
                ) : (
                  <div
                    style={styles.resendStyle}
                    onClick={() => {
                      setCounter(60);
                      resendOTP();
                    }}
                  >
                    Resend OTP
                  </div>
                )}
              </div>
              <div style={styles.timerAlign}>
                {counter !== 0 && <p style={styles.timerCount}>{counter}</p>}
              </div>
            </div>
            <Button
              style={styles.button}
              onClick={verifyOTPfind}
            >
              Continue
            </Button>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default EmailOTP;
