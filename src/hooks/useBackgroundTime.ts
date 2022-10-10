import { useRef } from 'react';
import { differenceInSeconds } from 'date-fns';

import useAppStateChange from './useAppStateChange';

function useBackgroundTime({ onActive }: { onActive: (diff: number) => unknown }) {
  const isInactiveRef = useRef(false);
  const startRef = useRef<Date>();

  useAppStateChange({
    onBackground: () => {
      isInactiveRef.current = false;

      startRef.current = new Date();
    },
    onActive: () => {
      if (!isInactiveRef.current && startRef.current) {
        onActive(differenceInSeconds(new Date(), startRef.current));
        startRef.current = undefined;
      }

      isInactiveRef.current = false;
    },
    onInactive: () => (isInactiveRef.current = true),
  });
}

export default useBackgroundTime;
