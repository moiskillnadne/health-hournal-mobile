import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { SplashScreenLogo } from '@assets/images';

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

type SplashState =
  | typeof LOADING_IMAGE
  | typeof FADE_IN_IMAGE
  | typeof FADE_OUT
  | typeof WAIT_FOR_APP_TO_BE_READY
  | typeof HIDDEN;

const SplashScreen = ({ isAppReady }: { isAppReady: boolean }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<SplashState>(LOADING_IMAGE);

  useEffect(() => {
    if (!isAppReady) {
      containerOpacity.setValue(1);
      imageOpacity.setValue(0);
      setState(LOADING_IMAGE);
    }
  }, [containerOpacity, imageOpacity, isAppReady]);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View collapsable={false} style={[style.container, { opacity: containerOpacity }]}>
      <Animated.Image
        source={SplashScreenLogo}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[{ opacity: imageOpacity }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default SplashScreen;
