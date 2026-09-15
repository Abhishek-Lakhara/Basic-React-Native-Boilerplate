import { baseApi } from '@/services/api/baseApi';
import { ENDPOINTS } from '@/services/config';
import { setOnBoardingStatus, setUser } from '@/features/auth/authSlice';
import type { OnboardingState, User } from '@/interface/user.type';

type ApiResponse<T> = {
  data?: T;
  user?: T;
};

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<ApiResponse<Partial<User>>, void>({
      query: () => ENDPOINTS.USER.USER,
      providesTags: ['Profile'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data.user ?? data.data;
          if (user) dispatch(setUser(user));
        } catch {
          // The generated query exposes the error to the screen.
        }
      },
    }),
    getOnboardingStatus: builder.query<OnboardingState, void>({
      query: () => ENDPOINTS.ONBOARDING.ONBOARDING_STATUS,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setOnBoardingStatus(data));
        } catch {
          // The generated query exposes the error to the screen.
        }
      },
    }),
  }),
});

export const { useGetOnboardingStatusQuery, useGetProfileQuery } = userApi;
