import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '@app/state/store';
import {
  logoff,
  logout,
  referralQuestionnaireCompleted,
  userChanged,
  tokensReceived,
} from '@app/state';
import { User } from '@app/types';

import { api, RefreshResponse } from './api';

export type AuthState = {
  user: Maybe<User>;
  token: Maybe<string>;
  accessToken: Maybe<string>;
  refreshToken: Maybe<string>;
};

export type LoginPayload = {
  user: User;
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, refreshToken: null } as AuthState,
  reducers: {},
  extraReducers: builder => {
    return builder
      .addCase(logoff, state => {
        state.user = null;
        state.token = null;
      })
      .addCase(logout, state => {
        state.user = null;
        state.token = null;
      })
      .addCase(userChanged, (state, action: PayloadAction<Partial<User>>) => {
        state.user = { ...state.user, ...action.payload } as User;
      })
      .addCase(referralQuestionnaireCompleted, state => {
        if (state.user) {
          state.user.isQuestionnairePassed = true;
        }
      })
      .addCase(tokensReceived, (state, { payload }: PayloadAction<RefreshResponse>) => {
        state.token = payload.idToken;
        state.accessToken = payload.accessToken;
      })
      .addMatcher(
        api.endpoints.signUp.matchFulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.user = payload;
        },
      )
      .addMatcher(
        api.endpoints.refresh.matchFulfilled,
        (state, { payload }: PayloadAction<RefreshResponse>) => {
          state.token = payload.idToken;
          state.accessToken = payload.accessToken;
        },
      )
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (
          state,
          { payload: { user, refreshToken, idToken, accessToken } }: PayloadAction<LoginPayload>,
        ) => {
          state.user = user;
          state.token = idToken;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        },
      );
  },
});

store.injectReducer(slice.name, slice.reducer);

export default slice;
