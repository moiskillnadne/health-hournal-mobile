import { baseApi } from '@app/state';
import { FirebaseNotification } from '@app/features/Notifications/types';

export type NotificationData = {
  date: string;
  items: FirebaseNotification[];
};

export type NotificationResponse = NotificationData[];

type ViewNotificationRequest = string[];

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Notifications-List', 'Notifications-Count'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      fetchNotifications: builder.query<NotificationResponse, void>({
        query: () => ({
          url: 'user/notifications',
          method: 'GET',
        }),
        providesTags: ['Notifications-List'],
      }),

      fetchNotificationsCount: builder.query<number, void>({
        query: () => ({
          url: 'user/notifications/count',
          method: 'GET',
        }),
        providesTags: ['Notifications-Count'],
      }),

      viewNotification: builder.mutation<number, ViewNotificationRequest>({
        query: body => ({
          url: 'user/notifications/viewed',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Notifications-List', 'Notifications-Count'],
      }),

      removeNotification: builder.mutation<undefined, string>({
        query: id => ({
          url: `user/notifications/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Notifications-List', 'Notifications-Count'],
      }),
    }),
    overrideExisting: __DEV__,
  });
