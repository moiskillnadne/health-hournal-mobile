import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectSettings = (state: RootState) => state.settings;

export const selectNotifications = createSelector(
  selectSettings,
  settings => settings.notifications,
);
export const selectReminders = createSelector(selectSettings, settings => settings.reminders);
