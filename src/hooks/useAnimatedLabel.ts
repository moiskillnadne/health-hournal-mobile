import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function useAnimatedLabel(initialValue = 0) {
  const animatedValue = useSharedValue(initialValue ? 1 : 0);

  const labelStyles = useAnimatedStyle(() => {
    const fontSize = animatedValue.value ? 12 : 16;
    const translateY = animatedValue.value ? 16 : 24;
    const opacity = animatedValue.value ? 1 : 0.5;

    return {
      fontSize,
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  function expandLabel() {
    animatedValue.value = 0;
  }

  function shrinkLabel() {
    animatedValue.value = withSpring(1);
  }

  return {
    animatedLabelValue: animatedValue,
    labelStyles,
    shrinkLabel,
    expandLabel,
  };
}

export default useAnimatedLabel;
