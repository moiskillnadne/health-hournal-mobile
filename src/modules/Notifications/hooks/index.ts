export { default as useTranslate } from './useTranslate';
import { api } from '../state';

export const {
  useFetchNotificationsQuery,
  useFetchNotificationsCountQuery,
  useViewNotificationMutation,
  useRemoveNotificationMutation,
} = api;
