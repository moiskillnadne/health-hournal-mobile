/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createApi } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

import createBaseQuery from './createBaseQuery';

const api = createApi({
  baseQuery: createBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export default api;
