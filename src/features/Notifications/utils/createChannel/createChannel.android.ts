import { AndroidChannel } from '@notifee/react-native';
import PushNotification from 'react-native-push-notification';

export default function createChannel(options: AndroidChannel) {
  return new Promise(resolve => {
    PushNotification.createChannel(
      {
        channelId: options.id,
        channelName: options.name,
      },
      () => resolve(options.id),
    );
  });
}
