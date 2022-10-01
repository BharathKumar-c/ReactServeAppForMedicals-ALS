import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';


const initialState = {
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'onboarding',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      console.log('payloadtoken',payload)
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
    },
  },
});

export const { setAccessToken, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
