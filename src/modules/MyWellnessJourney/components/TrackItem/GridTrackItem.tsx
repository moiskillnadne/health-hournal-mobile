import { useState } from 'react';
import { Box, Image, Text, Center } from 'native-base';

import { Loader } from '@app/components';

import { TRACK_CARD_DIMENSIONS } from '../../constants';

import { Props } from './index';

function GridTrackItem({ title, children, imageSource }: Omit<Props, 'id'>) {
  const [loaded, setLoaded] = useState(false);

  function finishLoading() {
    setLoaded(true);
  }

  return (
    <Box>
      <Image
        w={`${TRACK_CARD_DIMENSIONS.WIDTH}px`}
        h={`${TRACK_CARD_DIMENSIONS.HEIGHT}px`}
        source={{
          uri: imageSource,
        }}
        alt={title}
        resizeMode="cover"
        onLoadEnd={finishLoading}
      />

      {!loaded && (
        <Center w="full" h="full" position="absolute">
          <Box w="full" h="full" position="absolute" bgColor="primary.500" />

          <Box>
            <Loader color="#3EA832" />
          </Box>
        </Center>
      )}

      <Box position="absolute" bottom={0} h="45px" w="full">
        <Box w="full" h="full" bgColor="black" position="absolute" opacity={0.3} />

        <Box w="full" h="full" justifyContent="center">
          <Text
            color="white"
            fontSize="14px"
            lineHeight="16px"
            mx={2.5}
            zIndex={1}
            numberOfLines={2}
          >
            {title}
          </Text>
        </Box>
      </Box>

      {children}
    </Box>
  );
}

export default GridTrackItem;
