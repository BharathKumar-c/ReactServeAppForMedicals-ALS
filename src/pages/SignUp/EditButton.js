
import React, { useEffect, useState } from 'react';
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

import { Close } from '@material-ui/icons';
import {

  Edit,
  Delete
 } from '@material-ui/icons';
import {
   userUpdate,
} from '../../service/OnboardingService';
import Dialog from '@mui/material/Dialog';
import {
  setEmail,
  setFirstName,
  setLastName,

} from '../../state/reducer/onboardingSlice';
import './SignUp.css';
import {  useHistory } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "It's too short").required('Required'),
    lastName: Yup.string().typeError('Must given Last name').required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
       status: Yup.string().typeError('Enter status').required('Required'),
       phoneNumber: Yup.number().typeError('Enter valid Phone Number').required('Required'),
    });
  const useStyles = makeStyles(theme => ({
    input: {
      background: '#F5F5F5'
    },
    icon: {
      marginRight: '0.5%'
    },
    dialogPaper: {
      minHeight: '75vh',
      maxHeight: '95vh',
  },
  }));
const EditButton = (props) => {
  console.log('props===',props)
    const [successful, setSuccessful] = useState(false);
    const [formValues, setFormValues] = useState('');
    const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = useState([]);
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([]);
  const[userRole,setuserRole]=useState('')
    const registerSlice = useSelector(state => state.onboardingSliceReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

 useEffect  (() => {
    console.log(props.data.role_id,"kdjfdf")
    if (props.data.role_id === 1) {
     setuserRole('Project Principal')
    }
    else if (props.data.role_id === 2) {
      setuserRole('Site Principal')
    }
    else if (props.data.role_id === 3) {
      setuserRole('Data Collector')
    }
    else {
      setuserRole('Data Monitor')
    }
 },[props.data.role_id])
     const handleOpen = (data) => {
        setOpen(true);
         setEditData(data)
    };

    const handleClose = () => {
        setOpen(false);
        setEditData('');
    };
    const option = [
      { value: 1, label: 'SuperAdmin' },
      { value: 2, label: 'Admin' },
      { value: 3, label: 'Staff' },
    ];
    const formik = useFormik({
        initialValues: {
          firstName: props.data.first_name,
          lastName: props.data.last_name,
          email:props.data.email,
          phoneNumber: props.data.phone,
        status: props.data.status,
        gender:props.data.gender,
        dob: props.data.dob,
        address: props.data.address,
        country: props.data.country,
        citizenship: props.data.citizenship,

        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const sendValue = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                status: values.status
            };
            dispatch(setFirstName(sendValue.firstName));
            dispatch(setLastName(sendValue.lastName));
            dispatch(setEmail(sendValue.email));

            setFormValues(sendValue);
            setSuccessful(false);
                try {
                    const userUpdatedetails = await userUpdate({
                        userId:editData.userId,
                        firstName: sendValue.firstName,
                        lastName: sendValue.lastName,
                        email: sendValue.email,
                        phoneNumber: sendValue.phoneNumber,
                        status: sendValue.status
                    });
                    addUserToast(userUpdatedetails);
                }
                catch (e) {
                    throw e;
                }

        }
      });

      const addUserToast = async data => {
        if (data) {
          toast.success('successfully Updated');
          setFormValues('');

          handleClose();
          window.location.reload();
        } else {
          toast.error('Failed to send');
          setFormValues('');
        }
      };

      const handleClick = e => {
        e.preventDefault();
        history.push('/SignIn');
  };
  console.log('formik',formik)
    return (

        <>
            {localStorage.getItem('role_Id') === '1' ?(
            <Edit style=
                {{color:'black',opacity:'0.4'}}
                    onClick={() => {
                        handleOpen(props.data)
                    }} />) :
                ( <Edit style=
                    {{color:'black',opacity:'0.4'}}

                         />)}

        <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth={true}
          maxWidth='lg'
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent style={styles.dialogeContent}>
          <Paper style={styles.paperStyle} >
            <Grid align='center' class='col-md-12'>
              <div style={{ flexDirection: 'row' }} class='col-md-12'>
                <Box px={2} py={1} mb={2} sx={{ backgroundColor:'#0F585E',color:'white'}}>
                <Typography variant="h6" gutterBottom align='left'>Edit User</Typography>
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


                  <Grid item md={6} display='flex' alignItems='center'  sx={{height:'100%'}} >
                    <FormControl style={styles.formControl} component='fieldset'>
                    <Box display='flex' alignItems='center' sx={{ height: '100%'}}>
                      <Grid container >
                        <Grid item md={2}>
                          <Box display='flex' alignItems='center' sx={{ height: '100%'}}>
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
                            <Box
                            display="flex"
                            alignItems="center"

                        >
                            <Grid container>
                              <Grid item md={6} style={styles.genderStyle}>
                                <FormControlLabel
                                  style={styles.fradio}
                                  value="female"
                                  control={<Radio color="primary" />}
                                  label="Female"
                                />
                              </Grid>
                              <Grid item md={6}>
                                <FormControlLabel
                                  style={styles.mradio}
                                  value="male"
                                  control={<Radio color="primary" />}
                                  label="Male"
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
                        countryCodeEditable={false}
                      value={formik.values.phoneNumber}
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
                  <TextField
                    style={styles.textStyle}
                    variant='outlined'
                    name='status'
                    label='status'
                    placeholder='Enter your status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    InputProps={{ className: classes.input }}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                      />
                    </Grid>
                </Grid>
                     {/* <FormControl fullWidth variant='outlined' style={styles.roleForm}>
                  <InputLabel id='demo-simple-select-outlined-label' style={styles.roleInput}>
                    Role
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                        label='Role'
                        options={formik.values.role_id}
                      // value={this.props.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role_id.value}
                    name='role_id'
                    style={styles.roleSelect}
                  >
                    {/* <MenuItem>None</MenuItem> */}
                    {/* {options.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.role_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* {formik.touched.userType && formik.errors.userType ? (
                  <div style={styles.roleError}>{formik.errors.userType}</div>
                ) : null} */}

                {/* <FormControl style={styles.formSite}>
                  <InputLabel id='demo-simple-select-outlined-label' style={{ marginLeft: '3%',marginTop:'-2.4%',}}>
                    Site
                  </InputLabel>
                  <Select
                    labelId='demo-mutiple-checkbox-label'
                    id='demo-mutiple-checkbox'
                    multiple
                    value={formik.values.items}
                    name='items'
                    onChange={formik.handleChange}
                    classes={{icon:classes.icon}}
                    input={<OutlinedInput label='Tag' style={{marginLeft:'-1%'}}/>}
                    renderValue={selected =>
                      selected.map(obj => items[obj - 1].site_name).join(',')
                    }
                  > */}
                    {/* {items.map(name => (
                      <MenuItem key={name.id} value={name.id}>
                        <Checkbox
                          checked={formik.values.items.findIndex(item => item === name.id) >= 0}
                          color='primary'
                        />
                        <ListItemText primary={name.site_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>  */}
                {/* {formik.touched.items && formik.errors.items ? (
                  <div style={styles.siteError}>{formik.errors.items}</div>
                ) : null} */}
                  <Grid container spacing={3} justifyContent='center'>
                  <Button type='submit' variant='contained' py={2} px={4} my={1} style={styles.buttonStyle}>
                    Update
                  </Button>
                </Grid>
               </form>
              </Grid>
            </Paper>
          </DialogContent>
        </Dialog>
      </>
    );
}
export default EditButton