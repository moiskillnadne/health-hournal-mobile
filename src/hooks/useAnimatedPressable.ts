import { useRef, useCallback } from 'react';

import { Animated } from 'react-native';

function useAnimatedPressable() {
  const animatedContainer = useRef(new Animated.Value(0)).current;

  const shrinkContainer = useCallback(() => {
    Animated.spring(animatedContainer, {
      toValue: 1,
      speed: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedContainer]);

  const expandContainer = useCallback(() => {
    Animated.spring(animatedContainer, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [animatedContainer]);

  return {
    animatedContainer,
    shrinkContainer,
    expandContainer,
  };
}

export default useAnimatedPressable;
