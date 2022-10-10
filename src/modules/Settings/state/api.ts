import { baseApi } from '@app/state';

import { ChangePasswordForm, UserForm } from '../types';

type ChangePasswordRequest = ChangePasswordForm & {
  accessToken: string;
};

type SaveUserRequest = {
  data: Omit<UserForm, 'repeatEmail'>;
  accessToken: string;
};

type FetchAvatarResponse = {
  base64: string;
  mimeType: string;
};

type UploadAvatarRequest = {
  data: string;
  mime: string;
};

export type FetchNotificationsSettingsResponse = {
  scheduleAnAppointmentEnable: boolean;
  waterIntakeEnable: boolean;
  vitalsCheckEnable: boolean;
  myWellnessJourneytasksEnable: boolean;
  eyeExamEnable: boolean;
  newsAndUpdatesEnable: boolean;
  doctorAppointmentsEnable: boolean;
  medicationRemindersEnable: boolean;
  screeningTestsEnable: boolean;
};

export const api = baseApi
  .enhanceEndpoints({ addTagTypes: ['Profile-Picture', 'Notification-Settings'] })
  .injectEndpoints({
    endpoints: builder => ({
      contactSupport: builder.mutation<undefined, string>({
        query: emailBody => ({
          url: 'support/send-email',
          method: 'POST',
          body: {
            emailBody,
          },
        }),
      }),
      changePassword: builder.mutation<undefined, ChangePasswordRequest>({
        query: body => ({
          url: 'users/change-password',
          method: 'POST',
          body,
        }),
      }),
      saveUser: builder.mutation<undefined, SaveUserRequest>({
        query: body => ({
          url: 'users/save',
          method: 'PUT',
          body,
        }),
      }),
      fetchAvatar: builder.query<FetchAvatarResponse, void>({
        query: () => ({
          url: 'users/profile-image',
        }),
        providesTags: ['Profile-Picture'],
      }),
      uploadAvatar: builder.mutation<undefined, UploadAvatarRequest>({
        query: body => ({
          url: 'users/profile-image/upload',
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['Profile-Picture'],
      }),
      fetchNotificationsSettings: builder.query<FetchNotificationsSettingsResponse, void>({
        query: () => ({
          url: 'user/settings/notifications',
        }),
        providesTags: ['Notification-Settings'],
      }),
    }),
    overrideExisting: __DEV__,
  });
