import { checkInternetConnection } from 'react-native-offline';
import DeviceInfo from 'react-native-device-info';

import { baseApi } from '@app/state';
import { IdName, LabelValue, ListQueryParameters, ListQueryResponse, Event } from '@app/types';
import { Water } from '@app/features/Notifications';
import { Procedure } from '@app/types';

import { actions } from './';

type FrequencyResponse = {
  label: number;
  value: number;
}[];

type ConditionsResponse = (IdName & { description: string })[];

export type LastWeightResponse = {
  id: string;
  goalWeightLb: number;
  goalWeightKg: number;
  weightLb: number;
  weightKg: number;
  datetime: string;
};

export type HeightResponse = {
  value: {
    ft: number;
    in: number;
    cm: number;
  };
};

export type EventsResponse = {
  current: Event[];
  resolved: Event[];
};

export type SaveNotificationSettingsRequest = Partial<{
  scheduleAnAppointmentEnable: boolean;
  waterIntakeEnable: boolean;
  vitalsCheckEnable: boolean;
  myWellnessJourneytasksEnable: boolean;
  eyeExamEnable: boolean;
  newsAndUpdatesEnable: boolean;
  doctorAppointmentsEnable: boolean;
  medicationRemindersEnable: boolean;
  screeningTestsEnable: boolean;
}>;

export type SaveFCMTokenRequest = {
  fcmToken: string;
};

export type RemoveFCMTokenRequest = {
  userToken: string;
  fcmToken: string;
};

type StopNotificationsRequest = {
  userId: string;
  type: string;
  procedureId?: string;
};

type RemindNotificationsRequest = {
  userId: string;
  type: string;
};

export type SaveSettingRemindersRequest = {
  waterInterval: number;
  waterPeriod: string;
  waterFrom: string;
  waterTo: string;
};

export type SettingRemindersResponse = {
  waterInterval: number;
  waterPeriod: string;
  waterFrom: string;
  waterTo: string;
};

export type ITunesResponse = {
  results: [
    {
      trackId: string;
    },
  ];
};

export type AppStoreIdResponse = {
  appStoreId: string | undefined;
};

export type ProceduresResponse = Procedure[];

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Races', 'Gender', 'Weight-Last', 'Events-List', 'WaterSettings'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      fetchRaces: builder.query<IdName[], void>({
        query: () => ({
          url: 'race',
          method: 'GET',
        }),
        providesTags: ['Races'],
      }),

      fetchGenders: builder.query<IdName[], void>({
        query: () => ({
          url: 'gender',
          method: 'GET',
        }),
        providesTags: ['Gender'],
      }),

      fetchDose: builder.query<LabelValue[], string>({
        query: name => ({
          url: `medications/${name}`,
          method: 'GET',
        }),
      }),

      fetchFrequency: builder.query<LabelValue[], void>({
        transformResponse: (response: FrequencyResponse): LabelValue[] =>
          response.map(item => ({ label: String(item.label), value: String(item.value) })),
        query: () => ({
          url: 'user/procedures/interval',
          method: 'GET',
        }),
      }),

      fetchPeriods: builder.query<LabelValue[], void>({
        query: () => ({
          url: 'user/medications/periods',
          method: 'GET',
        }),
      }),

      fetchProcedurePeriods: builder.query<LabelValue[], void>({
        query: () => ({
          url: 'user/procedures/periods',
          method: 'GET',
        }),
      }),

      fetchCurrency: builder.query<LabelValue[], void>({
        query: () => ({
          url: 'user/medications/currency',
          method: 'GET',
        }),
      }),

      fetchMedicationList: builder.query<ListQueryResponse<string>, ListQueryParameters>({
        query: params => ({
          url: 'medications/search',
          method: 'GET',
          params,
        }),
      }),

      fetchHba1cOptions: builder.query<LabelValue[], void>({
        query: () => ({
          url: 'user/hba1c/options',
          method: 'GET',
        }),
      }),

      fetchConditions: builder.query<ConditionsResponse, void>({
        query: () => ({
          url: 'conditions',
          method: 'GET',
        }),
      }),

      fetchAppointments: builder.query<LabelValue[], void>({
        query: () => ({
          url: 'appointments',
          method: 'GET',
        }),
      }),

      fetchLastWeight: builder.query<LastWeightResponse, void>({
        query: () => ({
          url: 'user/weight/latest',
          method: 'GET',
        }),
        providesTags: ['Weight-Last'],
      }),

      fetchHeight: builder.query<HeightResponse, void>({
        query: () => ({
          url: 'user/height',
          method: 'GET',
        }),
      }),

      fetchEvents: builder.query<EventsResponse, void>({
        query: () => ({
          url: 'user/events',
          method: 'GET',
        }),
        providesTags: ['Events-List'],
      }),

      saveNotificationSettings: builder.mutation<undefined, SaveNotificationSettingsRequest>({
        query: body => ({
          url: 'user/settings/notifications/save',
          method: 'POST',
          body,
        }),
      }),

      saveFCMToken: builder.mutation<undefined, SaveFCMTokenRequest>({
        query: body => ({
          url: 'user/device',
          method: 'POST',
          body,
        }),
      }),

      removeFCMToken: builder.mutation<undefined, RemoveFCMTokenRequest>({
        query: ({ fcmToken, userToken }) => ({
          url: 'user/device',
          method: 'DELETE',
          body: {
            fcmToken,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }),
      }),

      remindNotifications: builder.mutation<undefined, RemindNotificationsRequest>({
        query: body => ({
          url: 'notifications/remind',
          method: 'POST',
          body,
        }),
      }),

      stopNotifications: builder.mutation<undefined, StopNotificationsRequest>({
        query: body => ({
          url: 'notifications/stop',
          method: 'POST',
          body,
        }),
      }),

      saveSettingsReminders: builder.mutation<undefined, SaveSettingRemindersRequest>({
        query: body => ({
          url: 'user/settings/reminders',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['WaterSettings'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            if (!isOnline) {
              const data = Water.toWater(patch);
              dispatch(actions.waterReminderAdded(data));
            }
          });
        },
      }),

      fetchSettingsReminders: builder.query<SettingRemindersResponse, void>({
        query: () => ({
          url: 'user/settings/reminders',
          method: 'GET',
        }),
        providesTags: ['WaterSettings'],
      }),

      fetchAppStoreId: builder.query<AppStoreIdResponse, void>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        queryFn: async () => {
          const bundleId = DeviceInfo.getBundleId();

          try {
            const response = await fetch(`https://itunes.apple.com/lookup?bundleId=${bundleId}`);
            const data = (await response.json()) as ITunesResponse;
            const appStoreId = data.results.find(app => !!app.trackId)?.trackId;

            return {
              data: {
                appStoreId,
              },
            };
          } catch (e) {
            const error = e as Error;

            return {
              error: {
                originalStatus: 400,
                data: {
                  code: 400,
                  details: {},
                  httpCode: 400,
                  message: error.message,
                },
                status: 400,
              },
            };
          }
        },
      }),

      fetchProcedures: builder.query<ProceduresResponse, void>({
        query: () => ({
          url: 'procedures',
          method: 'GET',
        }),
      }),
    }),
    overrideExisting: __DEV__,
  });
