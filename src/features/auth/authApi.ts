import { baseApi } from '@/services/api/baseApi';
import { ENDPOINTS } from '@/services/config';
import { setCredentials } from './authSlice';
import type { User } from '@/interface/user.type';

export type ApiEnvelope<T = unknown> = {
  status?: string | number;
  code?: string | number | boolean;
  message?: string;
  data?: T;
};

export type SendOtpRequest = {
  phone: string;
  countryCode: string;
};

export type VerifyOtpRequest = SendOtpRequest & {
  otp: string;
};

export type AuthPayload = {
  accessToken?: string;
  refreshToken?: string;
  user?: Partial<User>;
};

export type AuthResponse = ApiEnvelope<AuthPayload> & AuthPayload;

const getAuthPayload = (response: AuthResponse): AuthPayload => {
  const payload = response.data ?? response;

  return {
    accessToken: payload.accessToken ?? response.accessToken,
    refreshToken: payload.refreshToken ?? response.refreshToken,
    user: payload.user ?? response.user,
  };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendOtp: builder.mutation<ApiEnvelope, SendOtpRequest>({
      query: body => ({
        url: ENDPOINTS.AUTH.SEND_OTP,
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
      query: body => ({
        url: ENDPOINTS.AUTH.OTP_VERIFY,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload = getAuthPayload(data);

          if (payload.accessToken) {
            dispatch(
              setCredentials({
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                user: payload.user,
              }),
            );
          }
        } catch {
          // The generated mutation exposes the error to the screen.
        }
      },
    }),
    resendOtp: builder.mutation<ApiEnvelope, SendOtpRequest>({
      query: body => ({
        url: ENDPOINTS.AUTH.RESEND_OTP,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useResendOtpMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
