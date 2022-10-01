import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assets } from '../../../constants';

type OnboardingStepTwoState = {
  isLoading?: boolean;
  identityType: number;
  nationality: number;
  identityTypeList: identityTypeList[];
  allNationalityList: allNationalityList[];
  popularNationalityList: popularNationalityList[];
};

interface identityTypeList {
  id: number;
  title: string;
  image: any;
  checked?: any;
}

interface popularNationalityList {
  id: number;
  name: string;
}

interface allNationalityList {
  id: number;
  name: string;
}

const initialState: OnboardingStepTwoState = {
  isLoading: false,
  identityType: 1,
  nationality: 1,
  identityTypeList: [
    {
      id: 1,
      title: 'Passport',
      image: assets.Passport,
      checked: assets.Passport,
    },
    {
      id: 2,
      title: 'Driver license',
      image: assets.DriverLicense,
    },
    {
      id: 3,
      title: 'National ID',
      image: assets.NationalID,
    },
  ],
  popularNationalityList: [
    {
      id: 1,
      name: 'Irish',
    },
    {
      id: 2,
      name: 'American',
    },
    {
      id: 3,
      name: 'British',
    },
  ],
  allNationalityList: [
    {
      id: 1,
      name: 'Irish',
    },
    {
      id: 2,
      name: 'American',
    },
    {
      id: 3,
      name: 'British',
    },
    {
      id: 4,
      name: 'Indian',
    },
    {
      id: 5,
      name: 'Spain',
    },
  ],
};

const onboardingStepTwoSlice = createSlice({
  name: 'onboardingStepTwo',
  initialState: initialState,
  reducers: {
    setIdentityType: (state, { payload }: PayloadAction<number>) => {
      state.identityType = payload;
    },
    setNationality: (state, { payload }: PayloadAction<number>) => {
      state.nationality = payload;
    },
  },
});

export const { setIdentityType, setNationality } =
  onboardingStepTwoSlice.actions;

export default onboardingStepTwoSlice.reducer;
