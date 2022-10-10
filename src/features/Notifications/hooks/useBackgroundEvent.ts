import { useRef, useEffect } from 'react';
import notifee, { EventType, EventDetail } from '@notifee/react-native';

type EventOptions = {
  onDismissed?: (eventDetail: EventDetail) => Promise<void>;
  onPress?: (eventDetail: EventDetail) => Promise<void>;
  onActionPress?: (eventDetail: EventDetail) => Promise<void>;
};

function useBackgroundEvent({ onDismissed, onPress, onActionPress }: EventOptions = {}) {
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

    notifee.onBackgroundEvent(event => {
      const type = event.type as keyof typeof EventRef;

      const handler = EventRef[type]?.current;

      return handler ? handler(event.detail) : Promise.resolve();
    });
  }, []);
}

export default useBackgroundEvent;
