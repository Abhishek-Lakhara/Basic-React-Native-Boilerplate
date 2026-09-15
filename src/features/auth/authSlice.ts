import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ERoles } from '@/interface/general.type';
import { OnboardingState, User } from '@/interface/user.type';

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  onBoardingStatus?: OnboardingState;
  user: Partial<User>;
  role: ERoles | string;
  onBoarding: boolean;
};

export type AuthCredentials = {
  accessToken: string;
  refreshToken?: string | null;
  user?: Partial<User>;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: {},
  role: '',
  onBoarding: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthCredentials>) => {
      state.accessToken = action.payload.accessToken;

      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }

      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
    },
    setUserData: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string | null;
        user?: Partial<User>;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.user = action.payload.user ?? state.user;
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = action.payload;
    },
    setUserRole: (state, action: PayloadAction<ERoles | string>) => {
      state.role = action.payload;
    },
    setOnBoardingStatus: (
      state,
      action: PayloadAction<OnboardingState>,
    ) => {
      state.onBoardingStatus = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const authReducer = authSlice.reducer;
export const {
  resetAuth,
  setCredentials,
  setOnBoardingStatus,
  setUser,
  setUserData,
  setUserRole,
} = authSlice.actions;
