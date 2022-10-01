import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GeneralUtilState = {
  isBottomSheetOpened: boolean;
  isBiometricsAvailable: boolean;
  statusbarColor: string;
  translucent: boolean;
  barStyle: string;
};

const initialState: GeneralUtilState = {
  isBottomSheetOpened: false,
  isBiometricsAvailable: false,
  statusbarColor: '',
  translucent: false,
  barStyle: '',
};

const generalUtilSlice = createSlice({
  name: 'generlUtil',
  initialState: initialState,
  reducers: {
    setIsBottomSheet: (state, { payload }: PayloadAction<boolean>) => {
      state.isBottomSheetOpened = payload;
    },
    setIsBiometricsAvailablet: (state, { payload }: PayloadAction<boolean>) => {
      state.isBiometricsAvailable = payload;
    },
    setStatusbarColor: (state, { payload }: PayloadAction<string>) => {
      state.statusbarColor = payload;
    },
    setTranslucent: (state, { payload }: PayloadAction<boolean>) => {
      state.translucent = payload;
    },
    setBarStyle: (state, { payload }: PayloadAction<string>) => {
      state.barStyle = payload;
    },
  },
});

export const {
  setIsBottomSheet,
  setIsBiometricsAvailablet,
  setStatusbarColor,
  setTranslucent,
  setBarStyle,
} = generalUtilSlice.actions;

export default generalUtilSlice.reducer;
