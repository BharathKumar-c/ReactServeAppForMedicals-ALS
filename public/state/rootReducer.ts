import { combineReducers } from '@reduxjs/toolkit';

import onboarding from './onboarding';
import onboardingStepTwo from './onboarding/StepTwo';
import auth from './auth';
import generalUtil from './generalUtil';

const rootReducer = combineReducers({
  onboarding: onboarding,
  onboardingStepTwo: onboardingStepTwo,
  auth: auth,
  generalUtil: generalUtil,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
