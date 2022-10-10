import { Animated } from 'react-native';
import { Box, Image, Pressable, Text } from 'native-base';

import { useAnimatedPressable } from '@app/hooks';

type Props = {
  title: string;
  image: any;
  onPress: () => void;
};

function FoodType({ title, image, onPress }: Props) {
  const { animatedContainer, shrinkContainer, expandContainer } = useAnimatedPressable();

  return (
    <Pressable onPress={onPress} onPressIn={shrinkContainer} onPressOut={expandContainer}>
      <Animated.View
        style={{
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
        <Image h="170px" w="full" source={image} alt={title} rounded={4} />

        <Box position="absolute" bottom={0} h="46px" w="full">
          <Text color="white" m={3} zIndex={1} fontWeight={600}>
            {title}
          </Text>
          <Box w="full" h="full" bgColor="black" position="absolute" opacity={0.2} />
        </Box>
      </Animated.View>
    </Pressable>
  );
}

export default FoodType;
