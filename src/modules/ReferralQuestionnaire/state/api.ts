import { baseApi } from '@app/state';

import type { Referral } from '../types';

export type ReferralRequest = Referral;

export const api = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendReferral: builder.mutation<undefined, ReferralRequest>({
      query: body => ({
        url: 'users/referral',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: __DEV__,
});
