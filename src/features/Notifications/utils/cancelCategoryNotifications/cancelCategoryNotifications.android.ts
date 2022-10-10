import notifee from '@notifee/react-native';
import PushNotification from 'react-native-push-notification';

import { NOTIFICATION_CATEGORY } from '../../types';
import { getAllNotifications, getCategoryId } from '../';

export default async function (category: NOTIFICATION_CATEGORY) {
  const notificationIds = (await getAllNotifications())
    .filter(({ notification }) => getCategoryId(notification) === category)
    .map(({ notification }) => notification.id as string);

  PushNotification.getScheduledLocalNotifications(notifications => {
    notifications
      .filter(
        notification =>
          notification.data?.id && (notification.data.id as string).includes(category),
      )
      .forEach(notification => {
        PushNotification.cancelLocalNotification(notification.id);
      });
  });

  return notifee.cancelTriggerNotifications(notificationIds);
}
