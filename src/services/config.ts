import {
  BUCKET_URL,
  BASE_URL_PROD,
  GOOGLE_MAP_API_KEY,
} from '@env';

let MODE: 'DEV' | 'PROD' = __DEV__ ? 'DEV' : 'PROD';

export const BASE_URL =
  MODE === 'DEV' ? `https://bharatalk.peclick.co.in` : BASE_URL_PROD;
export const SOCKET_URL = BASE_URL;
export const API_URL = `${BASE_URL}/api/v1`;
export const ASSETS_URL = `${BUCKET_URL}`;
export const GOOGLE_API_KEY = GOOGLE_MAP_API_KEY;

export const ENDPOINTS = {
  AUTH: {
    SEND_OTP: 'auth/otp/send',
    OTP_VERIFY: 'auth/otp/verify',
    RESEND_OTP: 'auth/otp/resend',
    REFRESH_TOKEN: 'auth/token/refresh',
    LOGOUT: 'auth/logout',
  },
  ONBOARDING: {
    ONBOARDING_STATUS: 'onboarding/status',
  },
  USER: {
    USER: 'onboarding/profile',
  },
  COMMON: {
    CONFIG: 'config/all',
  },
};
