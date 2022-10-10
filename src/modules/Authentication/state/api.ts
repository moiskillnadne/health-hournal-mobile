import { baseApi, loginSuccess, selectCurrentUser, RootState } from '@app/state';
import { User } from '@app/types';
import { setCrashlytics } from '@app/utils';

import type { TLogIn, SignUpForm } from '../types';
import { cleanUpUserDataIf } from '../utils';

export type LoginRequest = TLogIn;
export type SignUpRequest = Omit<SignUpForm, 'confirmPassword' | 'repeatEmail'>;

export type LoginResponse = {
  user: User;
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

export type SignUpResponse = User;

export type ConfirmEmailRequest = {
  code: string;
  username: string;
};

export type RestorePasswordRequest = {
  email: string;
};

export type RestoreUsernameRequest = {
  email: string;
};

export type ConfirmNewPasswordRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export type ResendConfirmationCodeResponse = {
  username: string;
};

type VerifyChangedPasswordRequest = {
  code: string;
  accessToken: string;
  idToken: string;
};

type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  idToken: string;
};

type ResendVerificationCodeRequest = {
  attribute: string;
  accessCode: string;
  idToken: string | undefined;
};

export const api = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState;
        const user = selectCurrentUser(state);

        try {
          const { data } = await queryFulfilled;

          setCrashlytics(data.user.id, data.user.email);

          await cleanUpUserDataIf(() => !!user && user.id !== data.user.id, { dispatch, state });

          dispatch(
            loginSuccess({
              id: data.user.id,
              token: data.idToken,
              refreshToken: data.refreshToken,
            }),
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: body => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),

    resendConfirmationCode: builder.mutation<undefined, ResendConfirmationCodeResponse>({
      query: body => ({
        url: 'auth/resend-confirmation-code',
        method: 'POST',
        body,
      }),
    }),

    resendVerificationCode: builder.mutation<void, ResendVerificationCodeRequest>({
      query: ({ idToken, ...body }) => ({
        url: 'users/resend-verification-code',
        method: 'POST',
        body,
        ...(!!idToken && {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }),
      }),
    }),

    logout: builder.mutation<undefined, undefined>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),

    confirmEmail: builder.mutation<undefined, ConfirmEmailRequest>({
      query: body => ({
        url: 'auth/confirm-email',
        method: 'POST',
        body,
      }),
    }),

    restorePassword: builder.mutation<undefined, RestorePasswordRequest>({
      query: body => ({
        url: 'auth/restore-password',
        method: 'POST',
        body,
      }),
    }),

    restoreUsername: builder.mutation<undefined, RestoreUsernameRequest>({
      query: body => ({
        url: 'auth/restore-username',
        method: 'POST',
        body,
      }),
    }),

    confirmNewPassword: builder.mutation<undefined, ConfirmNewPasswordRequest>({
      query: body => ({
        url: 'auth/confirm-restore-password',
        method: 'POST',
        body,
      }),
    }),

    verifyChangedPassword: builder.mutation<undefined, VerifyChangedPasswordRequest>({
      query: body => ({
        url: 'users/verify/change-email',
        method: 'POST',
        body,
      }),
    }),

    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: body => ({
        url: 'auth/refresh',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: __DEV__,
});
