import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import { useSaveFCMTokenMutation, useAppSelector } from '@app/hooks';
import { selectIsAuthenticated } from '@app/state';

function useFirebaseBootstrap() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [saveToken] = useSaveFCMTokenMutation();

  useEffect(() => {
    async function bootstrap() {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().requestPermission();
    }

    async function sendToken() {
      const token = await messaging().getToken();

      saveToken({ fcmToken: token });

      messaging().onTokenRefresh(token => saveToken({ fcmToken: token }));
    }

    bootstrap();

    if (isAuthenticated) {
      sendToken();
    }
  }, [isAuthenticated, saveToken]);
}

export default useFirebaseBootstrap;
