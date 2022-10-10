import React, { useState } from 'react';
import { Box, Pressable } from 'native-base';

type Props = {
  max: number;
  now: number;
  onPress: (time: number) => unknown;
};

function Progress({ max, now, onPress }: Props) {
  const progressWidth = now ? ((now / max) * 100).toFixed() : 0;

  const [width, setWidth] = useState(0);

  return (
    <Pressable
      onPress={event => {
        const { locationX } = event.nativeEvent;
        const seconds = (locationX / width) * max;

        onPress(seconds);
      }}
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width);
      }}
    >
      <Box
        overflow="hidden"
        w="full"
        height={2}
        accessible
        accessibilityRole="progressbar"
        bgColor="white"
        accessibilityValue={{
          min: 0,
          max,
          now,
        }}
      >
        <Box
          w={`${progressWidth}%`}
          h="full"
          alignItems="center"
          justifyContent="center"
          bgColor="#3ea832"
          borderTopWidth={2}
          borderBottomWidth={2}
          borderColor="white"
        />
      </Box>
    </Pressable>
  );
}

export default Progress;
