import { combineReducers } from '@reduxjs/toolkit';

import onboardingSlice from './onboarding';
import auth from './auth';
import generalUtil from './generalUtil';

const rootReducer = combineReducers({
  onboardingSlice: onboardingSlice,
  auth: auth,
  generalUtil: generalUtil,
});


export default rootReducer;
