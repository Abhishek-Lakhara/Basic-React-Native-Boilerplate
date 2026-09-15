import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeType } from '@/interface';
import { DarkThemeColors, LightThemeColors } from '@/utils/theme.utils';
import { Appearance } from 'react-native';

export type ThemeState = {
  isDarkTheme: boolean;
  themeColor: themeType;
};

type ThemePayload = {
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
};

const scheme = Appearance.getColorScheme();

const initialState: ThemeState = {
  isDarkTheme: scheme === 'dark',
  themeColor: scheme === 'dark' ? DarkThemeColors : LightThemeColors,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemePayload>) => {
      state.themeColor = {
        ...state.themeColor,
        primary: action.payload.primary_color,
        secondary: action.payload.secondary_color,
        tertiary: action.payload.tertiary_color,
      };
    },
    toggleTheme: state => {
      state.isDarkTheme = !state.isDarkTheme;
      state.themeColor = state.isDarkTheme
        ? DarkThemeColors
        : LightThemeColors;
    },
    setSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.isDarkTheme = action.payload === 'dark';
      state.themeColor = state.isDarkTheme
        ? DarkThemeColors
        : LightThemeColors;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { setSystemTheme, setTheme, toggleTheme } = themeSlice.actions;
