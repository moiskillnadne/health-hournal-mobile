import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectNotifications = (state: RootState) => state.notifications;
