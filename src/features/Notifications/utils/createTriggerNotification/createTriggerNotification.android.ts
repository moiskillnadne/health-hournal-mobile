import { Notification, Trigger, RepeatFrequency, TriggerType } from '@notifee/react-native';
import PushNotification from 'react-native-push-notification';
import uuid from 'react-native-uuid';

export default function (notification: Notification, trigger: Trigger) {
  const repeatType = {
    [RepeatFrequency.DAILY]: 'day',
    [RepeatFrequency.HOURLY]: 'hour',
    [RepeatFrequency.WEEKLY]: 'week',
    [RepeatFrequency.NONE]: undefined,
  } as const;

  PushNotification.localNotificationSchedule({
    userInfo: {
      id: `${uuid.v4() as string}_${notification.android?.channelId ?? ''}`,
    },
    title: notification.title,
    message: notification.body ?? '',
    subText: notification.body,
    bigText: notification.body,
    channelId: notification.android?.channelId,
    actions: notification.android?.actions?.map(action => action.title),
    repeatType:
      trigger.type === TriggerType.TIMESTAMP
        ? repeatType[trigger.repeatFrequency as RepeatFrequency]
        : undefined,
    date: trigger.type === TriggerType.TIMESTAMP ? new Date(trigger.timestamp) : new Date(),
  });

  return Promise.resolve(notification.android?.channelId ?? 'created');
}
