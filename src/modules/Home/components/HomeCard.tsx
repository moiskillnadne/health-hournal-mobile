import { Animated, useWindowDimensions } from 'react-native';
import { Box, Image, Pressable, Text } from 'native-base';

import { useAnimatedPressable } from '@app/hooks';
import { noop } from '@app/utils';

type Props = {
  title: string;
  image: any;
  onPress: () => void;
  disabled?: boolean;
};

function HomeCard({ title, image, onPress, disabled }: Props) {
  const { animatedContainer, shrinkContainer, expandContainer } = useAnimatedPressable();

  const { height } = useWindowDimensions();

  return (
    <Pressable
      onPress={disabled ? noop : onPress}
      onPressIn={shrinkContainer}
      onPressOut={expandContainer}
    >
      <Animated.View
        style={{
          opacity: disabled ? 0.5 : 1,
          transform: [
            {
              scale: animatedContainer.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.96],
              }),
            },
          ],
        }}
      >
        <Image h={height / 5} w="full" source={image} alt={title} rounded={4} />

        <Box position="absolute" bottom={0} h="46px" w="full">
          <Text color="white" my={3} mx={2} zIndex={1} fontWeight={600} fontSize={15}>
            {title}
          </Text>
          <Box w="full" h="full" bgColor="black" position="absolute" opacity={0.2} />
        </Box>
      </Animated.View>
    </Pressable>
  );
}

export default HomeCard;
