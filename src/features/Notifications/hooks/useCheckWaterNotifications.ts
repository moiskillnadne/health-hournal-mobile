import { useEffect } from 'react';

import { useFetchSettingsRemindersQuery } from '@app/hooks';

import { useWaterNotifications, isAlarmPermissionsOn } from '@features/Notifications';

import { removeWaterNotifications } from '../notifications';
import { Water } from '../utils';

function useCheckWaterNotifications(condition: boolean) {
  const { data: remindersSettings } = useFetchSettingsRemindersQuery(undefined, {
    skip: !condition,
  });

  const { notification: waterNotification, create } = useWaterNotifications();

  async function remove() {
    await removeWaterNotifications();
  }

  useEffect(() => {
    if (condition && remindersSettings) {
      const notification = Water.toWater(remindersSettings);

      const createLocalNotification = () => {
        isAlarmPermissionsOn().then(hasPermissions => {
          if (hasPermissions) {
            create(notification);
          }
        });
      };

      if (waterNotification.notification) {
        const isEqual = Water.isEqual(waterNotification.notification, remindersSettings);

        if (!isEqual) {
          remove().then(createLocalNotification);
        }
      } else {
        createLocalNotification();
      }
    }
  }, [remindersSettings]);
}

export default useCheckWaterNotifications;
