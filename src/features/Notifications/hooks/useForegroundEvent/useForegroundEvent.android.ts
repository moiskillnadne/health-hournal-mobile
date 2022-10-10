import { useRef, useEffect } from 'react';
import notifee, { EventType, EventDetail } from '@notifee/react-native';
import PushNotification from 'react-native-push-notification';

import { toInitialNotification } from '../../utils';

type EventOptions = {
  onDismissed?: (eventDetail: EventDetail) => unknown;
  onPress?: (eventDetail: EventDetail) => unknown;
  onActionPress?: (eventDetail: EventDetail) => unknown;
};

function useForegroundEvent({ onDismissed, onPress, onActionPress }: EventOptions) {
  const onDismissedRef = useRef(onDismissed);
  const onPressRef = useRef(onPress);
  const onActionPressRef = useRef(onActionPress);

  onDismissedRef.current = onDismissed;
  onPressRef.current = onPress;
  onActionPressRef.current = onActionPress;

  useEffect(() => {
    const EventRef = {
      [EventType.DISMISSED]: onDismissedRef,
      [EventType.PRESS]: onPressRef,
      [EventType.ACTION_PRESS]: onActionPressRef,
    } as const;

    return notifee.onForegroundEvent(event => {
      const type = event.type as keyof typeof EventRef;

      EventRef[type]?.current?.(event.detail);
    });
  }, []);

  useEffect(() => {
    const EventRef = {
      [EventType.DISMISSED]: onDismissedRef,
      [EventType.PRESS]: onPressRef,
      [EventType.ACTION_PRESS]: onActionPressRef,
    } as const;

    return notifee.onBackgroundEvent(event => {
      const type = event.type as keyof typeof EventRef;

      EventRef[type]?.current?.(event.detail);

      return Promise.resolve();
    });
  }, []);

  useEffect(() => {
    PushNotification.configure({
      onNotification: pushNotification => {
        const { notification, pressAction } = toInitialNotification({
          ...pushNotification,
          userInfo: {},
        });

        if (!notification.android?.channelId) return;

        if (pressAction.id === 'default') {
          onPressRef.current?.({
            notification,
            pressAction,
          });
        } else {
          onActionPressRef.current?.({
            notification,
            pressAction,
          });
        }
      },
    });
  }, []);
}

export default useForegroundEvent;
