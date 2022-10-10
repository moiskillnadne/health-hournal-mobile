import {
  waterReminderAdded,
  waterReminderEnabled,
  waterReminderDisabled,
  selectWaterNotification,
} from '@app/state';
import { WaterNotification } from '@app/types';
import { useAppSelector, useAppDispatch } from '@app/hooks';

import { createWaterNotification, removeWaterNotifications } from '../notifications';

function useWaterNotifications() {
  const dispatch = useAppDispatch();
  const waterNotification = useAppSelector(selectWaterNotification);

  function enable() {
    const { notification } = waterNotification;

    if (notification != null) {
      createWaterNotification(notification).then(() => {
        dispatch(waterReminderAdded(notification));
      });
    } else {
      dispatch(waterReminderEnabled());
    }
  }

  function disable() {
    removeWaterNotifications().then(() => {
      dispatch(waterReminderDisabled());
    });
  }

  function create(notification: WaterNotification) {
    createWaterNotification(notification).then(() => {
      dispatch(waterReminderAdded(notification));
    });
  }

  return {
    create,
    enable,
    disable,
    notification: waterNotification,
  };
}

export default useWaterNotifications;
