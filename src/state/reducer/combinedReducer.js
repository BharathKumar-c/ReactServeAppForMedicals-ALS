/*
 * 23.05.2022
 * Copyright (c) 2022 GTS app, All Rights Reserved.
 */

import { combineReducers } from 'redux';
import onboardingSlice from './onboardingSlice';
import authSlice from '../auth'

export default combineReducers({
    onboardingSliceReducer: onboardingSlice,
    authSliceReducer:authSlice,

});