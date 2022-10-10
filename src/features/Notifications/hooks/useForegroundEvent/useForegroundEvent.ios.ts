import { useRef, useEffect } from 'react';
import notifee, { EventType, EventDetail } from '@notifee/react-native';

export type EventOptions = {
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
}

export default useForegroundEvent;
