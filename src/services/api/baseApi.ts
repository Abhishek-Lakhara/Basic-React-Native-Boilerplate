import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { API_URL, ENDPOINTS } from '@/services/config';
import type { RootState } from '@/store';
import { resetAuth, setCredentials } from '@/features/auth/authSlice';
import { setIsUnauthorized } from '@/store/slices/generalSlice';
import { devLog } from '@/utils/logger';

type JsonObject = Record<string, unknown>;

const asObject = (value: unknown): JsonObject | null =>
  typeof value === 'object' && value !== null ? (value as JsonObject) : null;

const extractTokens = (value: unknown) => {
  const response = asObject(value);
  const nestedData = asObject(response?.data);
  const data = nestedData ?? response;

  return {
    accessToken:
      typeof data?.accessToken === 'string' ? data.accessToken : null,
    refreshToken:
      typeof data?.refreshToken === 'string' ? data.refreshToken : undefined,
  };
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    headers.set('Accept', 'application/json');
    return headers;
  },
});

let refreshPromise: Promise<{
  accessToken: string;
  refreshToken?: string | null;
} | null> | null = null;

const refreshAccessToken = async (
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const refreshToken = (api.getState() as RootState).auth.refreshToken;

  if (!refreshToken) return null;

  const result = await rawBaseQuery(
    {
      url: ENDPOINTS.AUTH.REFRESH_TOKEN,
      method: 'POST',
      body: { refreshToken },
    },
    api,
    extraOptions,
  );

  if (result.error) {
    devLog('warn', 'api.auth.refresh_failed', {
      status: result.error.status,
    });
    return null;
  }

  const tokens = extractTokens(result.data);
  if (!tokens.accessToken) return null;

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const requestUrl = typeof args === 'string' ? args : args.url;
  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error?.status === 401 &&
    requestUrl !== ENDPOINTS.AUTH.REFRESH_TOKEN
  ) {
    refreshPromise ??= refreshAccessToken(api, extraOptions).finally(() => {
      refreshPromise = null;
    });

    const tokens = await refreshPromise;

    if (tokens) {
      api.dispatch(setCredentials(tokens));
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuth());
      api.dispatch(setIsUnauthorized(true));
    }
  }

  if (result.error) {
    devLog('warn', 'api.response.error', {
      url: requestUrl,
      status: result.error.status,
    });
  } else {
    devLog('debug', 'api.response.success', { url: requestUrl });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Profile', 'Config'],
  endpoints: () => ({}),
});
