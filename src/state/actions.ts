import { createAction } from '@reduxjs/toolkit';

import { User } from '../types';
import { RefreshResponse } from './types';

export const clear = createAction('clear');
export const logout = createAction('logout');
export const logoff = createAction('logoff');
export const tokensReceived = createAction<RefreshResponse>('tokensReceived');

export const referralQuestionnaireCompleted = createAction('referralQuestionnaireCompleted');

export const userChanged = createAction<Partial<User>>('userChanged');
