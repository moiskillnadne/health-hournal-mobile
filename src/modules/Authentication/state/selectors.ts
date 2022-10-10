import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector(selectAuth, auth => auth.user);
export const selectToken = createSelector(selectAuth, auth => auth?.token);
export const selectIsAuthenticated = createSelector(selectToken, maybeToken => !!maybeToken);
