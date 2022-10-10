import { t } from 'i18next';
import notifee, {
  Notification,
  InitialNotification,
  NotificationPressAction,
  AndroidStyle,
  AndroidNotificationSetting,
} from '@notifee/react-native';
import { set, getHours, getMinutes, getSeconds, isPast, addHours, addMinutes } from 'date-fns';
import messaging from '@react-native-firebase/messaging';
import type { ReceivedNotification } from 'react-native-push-notification';

import { FREQUENCY, TimeInterval, TimePeriod } from '@app/constants';
import { WaterNotification } from '@app/types';
import { SettingRemindersResponse } from '@app/state';
import { showSystemAlarmPermissionsAlert } from '@app/utils';

import { CATEGORY_ACTIONS, ANDROID_CATEGORY_ACTIONS_MAP } from '../constants';
import { NOTIFICATION_CATEGORY } from '../types';

export { default as createChannel } from './createChannel';
export { default as createTriggerNotification } from './createTriggerNotification';
export { default as cancelCategoryNotifications } from './cancelCategoryNotifications';
export { default as watchBackgroundMessages } from './watchBackgroundMessages';
export { default as watchBackgroundEvent } from './watchBackgroundEvent';

export function getAllNotifications() {
  return notifee.getTriggerNotifications();
}

export async function setNotificationCategories() {
  await notifee.requestPermission();

  return notifee.setNotificationCategories(
    Object.entries(CATEGORY_ACTIONS).map(([id, actions]) => ({
      id,
      actions: actions.map(action => ({
        ...action,
        title: t(action.title),
      })),
    })),
  );
}

export async function displayNotification(notification: Notification) {
  await notifee.requestPermission();

  const channelId =
    (await notifee.createChannel({
      id: notification.android?.channelId ?? 'default',
      name: notification.id ?? 'Default Channel',
    })) || notification.ios?.categoryId;

  const actions = CATEGORY_ACTIONS[channelId as keyof typeof CATEGORY_ACTIONS];

  return notifee.displayNotification({
    ...notification,
    android: {
      ...notification.android,
      channelId,
      actions: actions.map(action => ({
        title: t(action.title),
        pressAction: {
          id: action.id,
          launchActivity: action.foreground ? 'default' : undefined,
        },
      })),
      style: {
        type: AndroidStyle.BIGTEXT,
        text: notification.body ?? '',
      },
      smallIcon: 'ic_notification',
      color: '#9B57D3',
    },
  });
}

export const FrequencyAddTime = {
  [FREQUENCY.EVERY_HALF_HOUR]: (date: Date, value: number) => addMinutes(date, 30 * value),
  [FREQUENCY.HOURLY]: (date: Date, value: number) => addHours(date, 1 * value),
  [FREQUENCY.EVERY_TWO_HOURS]: (date: Date, value: number) => addHours(date, 2 * value),
} as const;

export function setTomorrowIf(date: Date, condition: boolean) {
  if (!condition) return date;

  let newDate = set(new Date(), {
    hours: getHours(date),
    minutes: getMinutes(date),
    seconds: getSeconds(date),
  });

  if (isPast(newDate)) {
    newDate = addHours(newDate, 24);
  }

  return newDate;
}

export function getCategoryId(notification: Notification & { channelId?: string }) {
  return (notification.android?.channelId ??
    notification.ios?.categoryId ??
    notification.channelId) as NOTIFICATION_CATEGORY | undefined;
}

export const getFCMToken = () => messaging().getToken();

export function toInitialNotification(
  receivedNotification: ReceivedNotification,
): InitialNotification {
  const categoryId = getCategoryId(receivedNotification) as NOTIFICATION_CATEGORY;

  const actions = ANDROID_CATEGORY_ACTIONS_MAP[categoryId];

  const pressAction: NotificationPressAction = {
    id: receivedNotification.action ? actions[receivedNotification.action].id : 'default',
  };

  const notification: Notification = {
    body: receivedNotification.message as string,
    data: receivedNotification.data,
    android: {
      channelId: categoryId,
    },
  };

  return {
    notification,
    pressAction,
  };
}

export const Water = {
  isEqual(waterSettings1: WaterNotification, waterSettings2: SettingRemindersResponse): boolean {
    return (
      TimeInterval[waterSettings1.frequency] === waterSettings2.waterInterval &&
      TimePeriod[waterSettings1.frequency] === waterSettings2.waterPeriod &&
      waterSettings2.waterFrom.includes(String(waterSettings1.timeRange.from)) &&
      waterSettings2.waterTo.includes(String(waterSettings1.timeRange.to))
    );
  },

  toWater(apiResponse: SettingRemindersResponse): WaterNotification {
    return {
      frequency: Object.entries(TimeInterval).find(
        ([key, value]) => value === apiResponse.waterInterval,
      )?.[0] as FREQUENCY,

      timeRange: {
        from: Number(apiResponse.waterFrom.split(':')[0]),
        to: Number(apiResponse.waterTo.split(':')[0]),
      },
    };
  },
};

export function isAlarmPermissionsOn(): Promise<boolean> {
  return new Promise(resolve => {
    notifee.getNotificationSettings().then(settings => {
      if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
        showSystemAlarmPermissionsAlert({
          onConfirm: () => {
            resolve(false);
            notifee.openAlarmPermissionSettings();
          },
        });
      } else {
        resolve(true);
      }
    });
  });
}
