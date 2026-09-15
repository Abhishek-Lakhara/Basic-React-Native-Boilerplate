import type { RootState } from './index';

export const selectAuth = (state: RootState) => state.auth;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectThemeColor = (state: RootState) => state.theme.themeColor;
export const selectIsUnauthorized = (state: RootState) =>
  state.general.isUnauthorized;
