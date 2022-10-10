import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import i18n from 'i18next';
import { Mutex } from 'async-mutex';

import { CustomFetchBaseQuery } from '@app/types';
import { delay } from '@app/utils';

import { RootState, RefreshResponse } from './types';
import { logout, tokensReceived } from './actions';
import { selectRefreshToken } from './system';

const { API_URL } = Config;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const token = state.auth?.token;

    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Accept-Language', i18n.resolvedLanguage);

    return headers;
  },
}) as CustomFetchBaseQuery;

const baseQueryWithReauth: CustomFetchBaseQuery = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = selectRefreshToken(api.getState() as RootState);

        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: {
              refreshToken,
            },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          api.dispatch(tokensReceived(refreshResult.data as RefreshResponse));

          await delay(0);

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await baseQuery(args, api, extraOptions);
    }
  }
  if (
    result.error &&
    (result.error.originalStatus === 502 || result.error.originalStatus === 503)
  ) {
    result.error.data = {
      message: 'The server is not available.',
      code: result.error.originalStatus.toString(),
      details: {},
      httpCode: result.error.originalStatus,
    };
  }

  return result;
};

function createBaseQuery() {
  return baseQueryWithReauth;
}

export default createBaseQuery;
