import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    email: '',
    phoneNumber: '',
    gender: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    role_Id: '',
    citizenship: '',
    country: '',
    address:'',
    emailToken: '',
    phoneToken: '',
    password: '',
    confirmPassword: '',
    termscondition: false,
    decryptValue: '',
    clear: '',
    rememberme: false,
    siteName: '',
    userId: '',
    emailOtptoken:''
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      console.log('ph',action.payload)
      state.phoneNumber = action.payload;
    },

    setGender: (state, action) => {
      console.log('gender',action.payload)
      state.gender = action.payload;
    },
    setSiteName: (state, action) => {
      console.log('sitename',action.payload)
      state.siteName = action.payload;
    },
    setFirstName: (state, action) => {
      console.log('action.payload', action.payload);
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      console.log('Lname',action.payload)
      state.lastName = action.payload;
    },
    setPassword: (state, action) => {
      console.log('password',action.payload)
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setRememberme: (state, action) => {
      state.rememberme = action.payload;
    },
    setDob: (state, action) => {
      console.log('dob',action.payload)
      state.dob = action.payload;
      // var years = moment().diff(moment(action.payload), 'years', false);
      // if (action.payload === null || years < 17) {
      //   state.dobError = 'Your age must be 18 or above';
      // } else {
      //   state.dobError = '';
      // }
    },

    setRole_Id: (state, action) => {
      console.log('Role===',action.payload)
      state.role_Id = action.payload;
    },
    setUserId: (state, action) => {
      console.log('userrrrrr===',action.payload)
      state.userId = action.payload;
    },

    setEmailToken: (state, action) => {

      state.emailToken = action.payload;
    },
    setPhoneToken: (state, action) => {
      state.phoneToken = action.payload;
    },
    setTermsconditions: (state, action) => {
      console.log('termsconditionr',action.payload)

      state.termscondition = action.payload;
    },
    setEmailOtpToken: (state, action) => {

      state.emailOtptoken = action.payload;
    },
    setDecryptValue: (state, action) => {
      state.decryptValue = action.payload;
    },
    setClear: (state, action) => {
      state.clear = action.payload;
    },
    setCitizenship: (state, action) => {
      state.citizenship = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    }
  }
});

export const {
  setEmail,
  setPhoneNumber,
  setGender,
  setFirstName,
  setLastName,
  setDob,
  setRole_Id,
  setEmailToken,
  setPhoneToken,
  setDecryptValue,
  setPassword,
  setConfirmPassword,
  setTermsconditions,
  setClear,
  setEmailOtpToken,
  setRememberme,
  setCitizenship,
  setCountry,
  setAddress,
  setSiteName,
  setUserId
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
