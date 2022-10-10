import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './types';

const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector(selectAuth, auth => auth.user);
export const selectToken = createSelector(selectAuth, auth => auth.token);
export const selectAccessToken = createSelector(selectAuth, auth => auth.accessToken);
export const selectIsAuthenticated = createSelector(selectToken, maybeToken => !!maybeToken);
