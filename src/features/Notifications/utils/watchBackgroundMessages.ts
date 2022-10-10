import messaging from '@react-native-firebase/messaging';
import { AndroidLaunchActivityFlag } from '@notifee/react-native';

import { i18nManager } from '@app/i18n';

import { displayNotification } from '../';
import { FirebaseNotification, RemoteMessage } from '../types';

async function onMessageReceived(remoteMessage: RemoteMessage) {
  if (!i18nManager.isInitialized()) {
    await i18nManager.initialize();
  }

  const { data } = remoteMessage;

  if (data) {
    const message = JSON.parse(data.message) as unknown as FirebaseNotification;

    displayNotification({
      ...message,
      android: {
        ...message.android,
        pressAction: {
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
          launchActivity: 'default',
          id: 'default',
        },
      },
    });
  }

  return Promise.resolve();
}

export default function watchBackgroundMessages() {
  messaging().setBackgroundMessageHandler(onMessageReceived);
}
