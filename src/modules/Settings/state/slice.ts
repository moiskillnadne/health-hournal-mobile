import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '@app/state/store';
import { waterReminderEnabled, waterReminderDisabled, clear } from '@app/state';

import { api } from './api';
import { Settings } from '../utils';

export type Reminders = {
  medicationRemindersEnable: boolean;
  doctorAppointmentsEnable: boolean;
  screeningTestsEnable: boolean;
  eyeExamEnable: boolean;
  scheduleAnAppointmentEnable: boolean;
  vitalsCheckEnable: boolean;
  waterIntakeEnable: boolean;
};

export type SettingsState = {
  notifications: Record<string, boolean>;
  reminders: Reminders;
};

const { fetchNotificationsSettings } = api.endpoints;

const initialState: SettingsState = {
  notifications: {
    myWellnessJourneytasksEnable: true,
    newsAndUpdatesEnable: false,
  },
  reminders: {
    medicationRemindersEnable: true,
    doctorAppointmentsEnable: true,
    screeningTestsEnable: true,
    eyeExamEnable: true,
    scheduleAnAppointmentEnable: true,
    vitalsCheckEnable: true,
    waterIntakeEnable: true,
  },
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    enableAllNotifications: state => {
      Object.keys(state.notifications).forEach(key => {
        state.notifications[key] = true;
      });
    },
    disableAllNotifications: state => {
      Object.keys(state.notifications).forEach(key => {
        state.notifications[key] = false;
      });
    },
    toggleNotification: (state, { payload }: PayloadAction<string>) => {
      state.notifications[payload] = !state.notifications[payload];
    },
    toggleReminder: (state, { payload }: PayloadAction<keyof Reminders>) => {
      state.reminders[payload] = !state.reminders[payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(clear, () => {
        return initialState;
      })
      .addCase(waterReminderEnabled, state => {
        state.reminders.waterIntakeEnable = true;
      })
      .addCase(waterReminderDisabled, state => {
        state.reminders.waterIntakeEnable = false;
      })
      .addMatcher(fetchNotificationsSettings.matchFulfilled, (state, action) => {
        const { notifications, reminders } = Settings.toLocalData(action.payload);

        state.notifications = notifications;
        state.reminders = reminders;
      });
  },
});

store.injectReducer(slice.name, slice.reducer);

export default slice;
