import { SaveNotificationSettingsRequest } from '@app/state/system/api';

import { FetchNotificationsSettingsResponse, SettingsState } from '../state';

export function getFirstLetter(string: Maybe<string>) {
  string = string ?? '';

  return string[0]?.toUpperCase();
}

export function createBase64Uri(base64: string, mime: string) {
  return `data:${mime};base64,${base64}`;
}

export const Settings = {
  toLocalData(settings: FetchNotificationsSettingsResponse): SettingsState {
    return {
      notifications: {
        myWellnessJourneytasksEnable: settings.myWellnessJourneytasksEnable,
        newsAndUpdatesEnable: settings.newsAndUpdatesEnable,
      },
      reminders: {
        medicationRemindersEnable: settings.medicationRemindersEnable,
        doctorAppointmentsEnable: settings.doctorAppointmentsEnable,
        screeningTestsEnable: settings.screeningTestsEnable,
        eyeExamEnable: settings.eyeExamEnable,
        scheduleAnAppointmentEnable: settings.scheduleAnAppointmentEnable,
        vitalsCheckEnable: settings.vitalsCheckEnable,
        waterIntakeEnable: settings.waterIntakeEnable,
      },
    };
  },
  toApiData(settings: SettingsState) {
    return {
      ...settings.notifications,
      ...settings.reminders,
    } as SaveNotificationSettingsRequest;
  },
};
