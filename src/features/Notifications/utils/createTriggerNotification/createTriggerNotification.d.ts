import { Notification, Trigger } from '@notifee/react-native';

export * from './createTriggerNotification.android';
export * from './createTriggerNotification.ios';

export type CreateTriggerNotification = (
  notification: Notification,
  trigger: Trigger,
) => Promise<string>;
