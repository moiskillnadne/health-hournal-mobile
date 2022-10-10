import { useContext, useEffect, useRef } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-native';
import type { History } from 'history';

type Blocker = (tx: BlockerContext) => unknown;
type BlockerContext = { retry: () => unknown };

function useBlocker(blocker: Blocker, when: boolean) {
  const navigator = useContext(NavigationContext).navigator as History;
  const blockerRef = useRef(blocker);

  blockerRef.current = blocker;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: BlockerContext) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blockerRef.current(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, when]);
}

export default useBlocker;
