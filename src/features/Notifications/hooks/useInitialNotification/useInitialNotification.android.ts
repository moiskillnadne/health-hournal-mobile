import { useState, useEffect, useCallback } from 'react';

import notifee, { InitialNotification } from '@notifee/react-native';
import PushNotification from 'react-native-push-notification';

import { toInitialNotification } from '../../utils';

function useInitialNotification() {
  const [initialNotification, setInitialNotification] = useState<InitialNotification | null>();

  useEffect(() => {
    async function getInitialNotification() {
      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        const { notification } = initialNotification;
        const isAndroidLocalNotification = 'userInteraction' in notification;

        if (!isAndroidLocalNotification) {
          setInitialNotification(initialNotification);
        }
      }
    }

    getInitialNotification();
  }, []);

  useEffect(() => {
    PushNotification.popInitialNotification(notification => {
      const isAndroidLocalNotification = notification && 'userInteraction' in notification;

      if (isAndroidLocalNotification) {
        setInitialNotification(toInitialNotification(notification));
      }
    });
  }, []);

  const clear = useCallback(() => {
    setInitialNotification(null);
  }, []);

  return [initialNotification, clear] as const;
}

export default useInitialNotification;
