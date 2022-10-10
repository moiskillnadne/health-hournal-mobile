import { useRef, useMemo, useEffect } from 'react';
import { AppState } from 'react-native';

type Callback = () => unknown;

type Args = {
  onBackground?: Callback;
  onActive?: Callback;
  onInactive?: Callback;
};

function useOnFocusAppEvent({ onActive, onInactive, onBackground }: Args) {
  const onActiveRef = useRef(onActive);
  const onBackgroundRef = useRef(onBackground);
  const onInactiveRef = useRef(onInactive);

  onActiveRef.current = onActive;
  onBackgroundRef.current = onBackground;
  onInactiveRef.current = onInactive;

  const refs = useMemo(
    () =>
      ({
        background: onBackgroundRef,
        active: onActiveRef,
        inactive: onInactiveRef,
      } as const),
    [],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', status => {
      const callbackRef = refs[status as keyof typeof refs];

      callbackRef && callbackRef.current && callbackRef.current();
    });

    return () => {
      subscription.remove();
    };
  }, [refs]);
}

export default useOnFocusAppEvent;
