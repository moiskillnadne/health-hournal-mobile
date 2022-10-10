import { useRef, useMemo, useLayoutEffect } from 'react';
import { Animated, Easing } from 'react-native';

import { Box } from 'native-base';

import { LoaderIcon } from './icons';

type Props = {
  color?: string;
};

function Loader({ color }: Props) {
  const animatedContainer = useRef(new Animated.Value(0));

  useLayoutEffect(() => {
    Animated.loop(
      Animated.timing(animatedContainer.current, {
        toValue: 1,
        duration: 1200,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = useMemo(
    () =>
      animatedContainer.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [],
  );

  return (
    <Box>
      <Animated.View style={{ transform: [{ rotate: spin }], alignSelf: 'flex-start' }}>
        <LoaderIcon fill={color} />
      </Animated.View>
    </Box>
  );
}

export default Loader;
