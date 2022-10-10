import notifee, { Notification, Trigger } from '@notifee/react-native';

export default function (notification: Notification, trigger: Trigger) {
  return notifee.createTriggerNotification(notification, trigger);
}
