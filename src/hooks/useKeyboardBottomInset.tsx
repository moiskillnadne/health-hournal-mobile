import { useState, useEffect, useRef } from 'react';
import { Keyboard, EmitterSubscription, Platform, StatusBar } from 'react-native';

function useKeyboardBottomInset() {
  const [bottom, setBottom] = useState(0);
  const subscriptions = useRef<EmitterSubscription[]>([]);

  useEffect(() => {
    subscriptions.current = [
      Keyboard.addListener('keyboardDidHide', () => setBottom(0)),
      Keyboard.addListener('keyboardDidShow', e => {
        if (Platform.OS === 'android') {
          setBottom(e.endCoordinates.height);
        } else {
          setBottom(Math.max(e?.startCoordinates?.height ?? 0, e.endCoordinates.height));
        }
      }),
    ];

    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
}

export default useKeyboardBottomInset;
