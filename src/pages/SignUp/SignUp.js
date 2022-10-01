import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import styles from './SignUpStyle';
import * as Yup from 'yup';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  DialogContent,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Box,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Close } from '@material-ui/icons';

import {
  checkEmailAlreadyExists,
  checkPhoneAlreadyExists,
  sendOtp,
  register,
  role,
  site_info,
  getuser
} from '../../service/OnboardingService';
import Dialog from '@mui/material/Dialog';
import { Multiselect } from 'multiselect-react-dropdown';
import moment from 'moment';
import {
  setAddress,
  setCitizenship,
  setCountry,
  setDob,
  setEmail,
  setFirstName,
  setGender,
  setLastName,
  setPhoneNumber,
  setRole,
  setRole_Id,
  setUserId
} from '../../state/reducer/onboardingSlice';
import './SignUp.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AgGirdReact from '../../components/AgGirdReact';
import cartColDef from '../../components/cartColDef';
import { maxWidth } from '@mui/system';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "It's too short").required('Required'),
  lastName: Yup.string().typeError('Must given Last name').required('Required'),
  email: Yup.string().email('Enter valid email').required('Required'),
  address: Yup.string().typeError('Enter address').required('Required'),
  citizenship: Yup.string().typeError('Enter citizenship').required('Required'),
  country: Yup.string().typeError('Enter country').required('Required'),
  gender: Yup.string().oneOf(['male', 'female'], 'Required').required('Required'),
  phoneNumber: Yup.number().typeError('Enter valid Phone Number').required('Required'),
  dob: Yup.string()
    .required('DOB is Required')
    .test(
      'DOB',
      'Please choose a valid date of birth',
      date => moment().diff(moment(date), 'years') >= 18
    ),
  userType: Yup.string().required('Select Role'),
  items: Yup.array()
    .min(1)
    .of(Yup.string().required('Select Site Atleast one'))
    .required('Select Site Atleast one')
});
const useStyles = makeStyles(theme => ({
  input: {
    background: '#F5F5F5'
  },
  icon: {
    marginRight: '0.5%'
  },
  dialogPaper: {
    minHeight: '90vh',
    maxHeight: '95vh'
  }
}));

const SignUp = ({ props }) => {
  const [successful, setSuccessful] = useState(false);
  const [formValues, setFormValues] = useState('');
  const [errorType, setErrorType] = useState('');
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState();
  const [rowData, setRowData] = useState([]);
  const registerSlice = useSelector(state => state.onboardingSliceReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { value } = useParams();
  console.log('value', value);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = data => {
    setOpen(true);
    setEditData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData('');
  };

  useEffect(async () => {
    const roletype = await role();
    setOptions(roletype.useraccess);
    const siteinfo = await site_info();
    setItems(siteinfo.useraccess);
  }, [role, site_info]);

  useEffect(async () => {
    const userall = await getuser();
    setRowData(userall.useraccess);
    rowData.map(user => {
      dispatch(setUserId(user.userId));
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: registerSlice.firstName,
      lastName: registerSlice.lastName,
      email: registerSlice.email,
      gender: registerSlice.gender,
      phoneNumber: registerSlice.phoneNumber,
      dob: registerSlice.dob,
      userType: registerSlice.role,
      address: registerSlice.address,
      country: registerSlice.country,
      citizenship: registerSlice.citizenship,
      role_Id: registerSlice.role_Id,
      items: [],
      checked: false
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const sendValue = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        dob: values.dob,
        address: values.address,
        country: values.country,
        citizenship: values.citizenship,
        role_Id: values.userType,
        site_id: values.items,
        checked: values.checked
      };

      dispatch(setFirstName(sendValue.firstName));
      dispatch(setLastName(sendValue.lastName));
      dispatch(setEmail(sendValue.email));
      dispatch(setGender(sendValue.gender));
      dispatch(setDob(sendValue.dob));
      dispatch(setRole_Id(sendValue.role_Id));
      dispatch(setCitizenship(sendValue.citizenship));
      dispatch(setAddress(sendValue.address));
      dispatch(setCountry(sendValue.country));
      setFormValues(sendValue);
      setSuccessful(false);

      try {
        const response = await Promise.all([
          checkEmailAlreadyExists(sendValue.email.trim()),
          checkPhoneAlreadyExists(sendValue.phoneNumber.trim())
        ]);

        setSuccessful(false);
        if (response[0] && response[0]?.exist) {
          setErrorType('email');
          toast.error('Email already Exist');
        } else if (response[1] && response[1]?.exist === true) {
          setErrorType('phone');
          toast.error('PhoneNumber already Exist');
        } else {
          setErrorType('');

          const preRegister = await register({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
            dob: values.dob,
            address: values.address,
            country: values.country,
            citizenship: values.citizenship,
            role_id: values.userType,
            site_id: values.items.toString()
          });

          if (values.email) {
            const Mailservice = await sendOtp(values.email, 'email');
          }
          addUserToast(sendValue);
        }
      } catch (err) {
        console.log(err);
        setSuccessful(false);
      }
      // }
    }
  });

  const addUserToast = async data => {
    if (data) {
      toast.success('Password Set Link Sent to mail');
      handleClose();
      // window.location.reload();
    } else {
      toast.error('Failed to send');
      setFormValues('');
    }
  };
  const customStyle = {
    dropdownIndicator: base => ({
      ...base,
      color: 'red'
    })
  };
  const handleClick = e => {
    e.preventDefault();

    history.push('/SignIn');
  };
  return (
    <div style={{ flexDirection: 'row' }}>
      {/* <h3 style={{ marginTop: '3%', marginLeft: '16%' }}>User overview</h3> */}
      <div style={{ marginTop: '10%', marginLeft: '-5%' }}>
        {localStorage.getItem('role_Id') === '3' && '4' ? (

          <Button variant='outlined' style={styles.addbuttonInActive}>
            Add User
          </Button>
        ) : (
          <Button variant='outlined' style={styles.addbuttonActive} onClick={() => setOpen(true)}>
            Add User
          </Button>
        )}

        <div style={{marginLeft: value === 'true' ? "8rem" : 0}}>
            <AgGirdReact
              columnDefs={cartColDef}
              rowData={rowData}
              context={handleOpen}
              value={value}
              height='70vh'
            />
          </div>
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth={true}
        maxWidth='lg'
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent style={styles.dialogeContent}>
          <Paper style={styles.paperStyle}>
            <Grid align='center' class='col-md-12'>
              <div style={{ flexDirection: 'row' }} class='col-md-12'>
                <Box px={2} py={1} mb={2} sx={{ backgroundColor: '#0F585E', color: 'white' }}>
                  <Typography variant='h6' gutterBottom align='left'>
                    Add User
                  </Typography>
                </Box>
                {/* <div style={styles.closeIcon}>
                  <Close onClick={handleClose} />
                </div> */}
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      style={styles.textStyle}
                      variant='outlined'
                      name='firstName'
                      label='First Name'
                      placeholder='Enter your name'
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      InputProps={{ className: classes.input }}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      style={styles.textStyle}
                      variant='outlined'
                      name='lastName'
                      label='Last Name'
                      placeholder='Enter your name'
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      InputProps={{ className: classes.input }}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={value => formik.setFieldValue('dob', value, true)}
                        label='Date of Birth'
                        value={formik.values.dob}
                        renderInput={params => (
                          <TextField
                            style={styles.textStyle}
                            margin='normal'
                            name='dob'
                            variant='outlined'
                            fullWidth
                            {...params}
                            value={formik.values.dob}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {formik.touched.dob && formik.errors.dob ? (
                      <div style={styles.dobError}>{formik.errors.dob}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      style={styles.textStyle}
                      variant='outlined'
                      name='email'
                      label='Email'
                      placeholder='Enter your email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      InputProps={{ className: classes.input }}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      style={styles.textStyle}
                      variant='outlined'
                      name='address'
                      label='Address'
                      placeholder='Enter your Address'
                      multiline
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      InputProps={{ className: classes.input }}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      style={styles.textStyle}
                      variant='outlined'
                      name='country'
                      label='Country'
                      placeholder='Enter your country'
                      multiline
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      InputProps={{ className: classes.input }}
                      error={formik.touched.country && Boolean(formik.errors.country)}
                      helperText={formik.touched.country && formik.errors.country}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      style={styles.textStyle}
                      variant='outlined'
                      name='citizenship'
                      label='City'
                      placeholder='Enter your city'
                      multiline
                      value={formik.values.citizenship}
                      onChange={formik.handleChange}
                      InputProps={{ className: classes.input }}
                      error={formik.touched.citizenship && Boolean(formik.errors.citizenship)}
                      helperText={formik.touched.citizenship && formik.errors.citizenship}
                    />
                  </Grid>

                  <Grid item md={6} display='flex' alignItems='center' sx={{ height: '100%' }}>
                    <FormControl style={styles.formControl} component='fieldset'>
                      <Box display='flex' alignItems='center' sx={{ height: '100%' }}>
                        <Grid container>
                          <Grid item md={2}>
                            <Box display='flex' alignItems='center' sx={{ height: '100%' }}>
                              <FormLabel style={styles.genderLabel} component='legend'>
                                Gender
                              </FormLabel>
                            </Box>
                          </Grid>
                          <Grid item md={4}>
                            <RadioGroup
                              aria-label='gender'
                              name='gender'
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                              style={{ display: 'initial', width: '100%' }}
                            >
                              <Box display='flex' alignItems='center'>
                                <Grid container>
                                  <Grid item md={6} style={styles.genderStyle}>
                                    <FormControlLabel
                                      style={styles.fradio}
                                      value='female'
                                      control={<Radio color='primary' />}
                                      label='Female'
                                    />
                                  </Grid>
                                  <Grid item md={6}>
                                    <FormControlLabel
                                      style={styles.mradio}
                                      value='male'
                                      control={<Radio color='primary' />}
                                      label='Male'
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </RadioGroup>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div style={styles.genderError}>{formik.errors.gender}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <PhoneInput
                      style={styles.phone}
                      country={'ie'}
                      value={formik.values.phoneNumber}
                      countryCodeEditable={false}
                      onChange={e => formik.setFieldValue('phoneNumber', e)}
                      onBlur={formik.handleBlur('phoneNumber')}
                      inputStyle={styles.inputStyle}
                      buttonStyle={{ borderRadius: '5px 0 0 5px', width: '8%' }}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div style={styles.phoneError}>{formik.errors.phoneNumber}</div>
                    ) : null}
                  </Grid>
                  <Grid item md={6}>
                    <FormControl fullWidth variant='outlined' style={styles.roleForm}>
                      <InputLabel id='demo-simple-select-outlined-label' style={styles.roleInput}>
                        Role
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Role'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userType}
                        name='userType'
                        style={styles.roleSelect}
                      >
                        {/* <MenuItem>None</MenuItem> */}
                        {options.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.role_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {formik.touched.userType && formik.errors.userType ? (
                      <div style={styles.roleError}>{formik.errors.userType}</div>
                    ) : null}
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <FormControl style={styles.formSite}>
                      <InputLabel
                        id='demo-simple-select-outlined-label'
                        style={{ marginLeft: '1%', marginTop: '-0.5%' }}
                      >
                        Site
                      </InputLabel>
                      <Select
                        labelId='demo-mutiple-checkbox-label'
                        id='demo-mutiple-checkbox'
                        multiple
                        value={formik.values.items}
                        name='items'
                        onChange={formik.handleChange}
                        classes={{ icon: classes.icon }}
                        input={<OutlinedInput label='Tag' />}
                        renderValue={selected =>
                          selected.map(obj => items[obj - 1].site_name).join(',')
                        }
                      >
                        {items.map(name => (
                          <MenuItem key={name.id} value={name.id}>
                            <Checkbox
                              checked={formik.values.items.findIndex(item => item === name.id) >= 0}
                              color='primary'
                            />
                            <ListItemText primary={name.site_name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {formik.touched.items && formik.errors.items ? (
                      <div style={styles.siteError}>{formik.errors.items}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent='center'>
                  <Button
                    type='submit'
                    variant='contained'
                    py={2}
                    px={4}
                    my={1}
                    style={styles.buttonStyle}
                  >
                    Save
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SignUp;
