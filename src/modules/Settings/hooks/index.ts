import { api } from '../state';

export { default as useTranslate } from './useTranslate';

export const {
  useContactSupportMutation,
  useChangePasswordMutation,
  useSaveUserMutation,
  useUploadAvatarMutation,
  useFetchAvatarQuery,
  useFetchNotificationsSettingsQuery,
} = api;
