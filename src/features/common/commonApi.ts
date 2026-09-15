import { baseApi } from '@/services/api/baseApi';
import { ENDPOINTS } from '@/services/config';
import { setConfigData } from '@/store/slices/generalSlice';

type ConfigData = {
  zikCoinsPerDollar?: number;
};

type ApiResponse<T> = {
  data?: T;
};

export const commonApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getConfig: builder.query<ApiResponse<ConfigData>, void>({
      query: () => ENDPOINTS.COMMON.CONFIG,
      providesTags: ['Config'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data) dispatch(setConfigData(data.data));
        } catch {
          // The generated query exposes the error to the screen.
        }
      },
    }),
  }),
});

export const { useGetConfigQuery } = commonApi;
