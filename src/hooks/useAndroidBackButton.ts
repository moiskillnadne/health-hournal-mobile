import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

function useAndroidBackButton(callback: () => void | boolean) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const shouldPropagateEvent = callbackRef.current();

      return shouldPropagateEvent ?? true;
    });

    return () => backHandler.remove();
  }, []);
}

export default useAndroidBackButton;
