import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GeneralState = {
  isUnauthorized: boolean;
  configData: {
    zikCoinsPerDollar: number;
  };
};

const initialState: GeneralState = {
  isUnauthorized: false,
  configData: {
    zikCoinsPerDollar: 1,
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsUnauthorized: (state, action: PayloadAction<boolean>) => {
      state.isUnauthorized = action.payload;
    },
    setConfigData: (
      state,
      action: PayloadAction<Partial<GeneralState['configData']>>,
    ) => {
      state.configData = { ...state.configData, ...action.payload };
    },
  },
});

export const generalReducer = generalSlice.reducer;
export const { setConfigData, setIsUnauthorized } = generalSlice.actions;
