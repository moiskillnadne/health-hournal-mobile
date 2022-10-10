import slice from './slice';

export * from './selectors';

export const { reducer, actions } = slice;

export const {
  offlineActionCreated,
  offlineActionsCleared,
  changeMeasurementUnit,
  loginSuccess,
  waterReminderAdded,
  waterReminderEnabled,
  waterReminderDisabled,
  waterReminderDisabledToggled,
} = actions;

export { api as systemApi } from './api';
export type { SettingRemindersResponse } from './api';
