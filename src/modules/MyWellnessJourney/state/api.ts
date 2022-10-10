import { baseApi } from '@app/state';

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    endpoints: builder => ({}),
    overrideExisting: __DEV__,
  });
