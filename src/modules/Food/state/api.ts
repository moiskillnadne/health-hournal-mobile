import { baseApi } from '@app/state';
import { ListQueryResponse, ListQueryParameters } from '@app/types';

import { PdfItem } from '../types';

export const api = baseApi.enhanceEndpoints({ addTagTypes: [] }).injectEndpoints({
  endpoints: builder => ({
    fetchFoodPdfList: builder.query<ListQueryResponse<PdfItem[]>, ListQueryParameters>({
      query: params => ({
        url: 'food',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: __DEV__,
});
