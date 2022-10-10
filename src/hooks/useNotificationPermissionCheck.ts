import { useContext, useCallback } from 'react';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

import { ModalWarningContext } from '@app/contexts';

async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings();

  return settings.authorizationStatus == AuthorizationStatus.AUTHORIZED;
}

function useNotificationPermissionCheck() {
  const { openModal } = useContext(ModalWarningContext);

  return useCallback(async () => {
    const result = await checkNotificationPermission();

    if (!result) {
      openModal();
    }

    return result;
  }, [openModal]);
}

export default useNotificationPermissionCheck;
