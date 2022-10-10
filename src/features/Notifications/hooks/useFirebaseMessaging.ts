import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import { displayNotification } from '../utils';
import { FirebaseNotification, RemoteMessage } from '../types';

function useFirebaseMessaging() {
  useEffect(() => {
    function onMessageReceived({ data }: RemoteMessage) {
      if (data) {
        const message = JSON.parse(data.message) as unknown as FirebaseNotification;

        displayNotification(message);
      }
    }

    messaging().onMessage(onMessageReceived);
  }, []);
}

export default useFirebaseMessaging;
