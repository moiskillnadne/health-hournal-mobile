import notifee from '@notifee/react-native';

import { NOTIFICATION_CATEGORY } from '../../types';
import { getAllNotifications, getCategoryId } from '../';

export default async function (category: NOTIFICATION_CATEGORY) {
  const notificationIds = (await getAllNotifications())
    .filter(({ notification }) => getCategoryId(notification) === category)
    .map(({ notification }) => notification.id as string);

  return notifee.cancelTriggerNotifications(notificationIds);
}
