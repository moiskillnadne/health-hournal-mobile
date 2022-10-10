import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Box, Stack, Column, Center, Text, Image } from 'native-base';

import { Loader } from '@app/components';
import { PlayIcon } from '@app/components/icons';
import { TruncatedPRenderer, TruncatedBodyRender } from '@app/utils/components';

import { FavoriteIndicatorIcon, ViewedGreenIcon, ViewedIcon } from './icons';

type Props = {
  type: 'grid' | 'list';
  imageSource: string;
  title: string;
  description: string;
  isFavorite: boolean;
  isViewed?: boolean;
};

const PADDINGS_SIZE = 26;

function VideoCard({
  imageSource,
  title,
  description,
  type = 'list',
  isFavorite,
  isViewed,
}: Props) {
  const isListView = type === 'list';

  const [loaded, setLoaded] = useState(false);
  const { width } = useWindowDimensions();

  const htmlWidth = width - PADDINGS_SIZE * 2;

  function finishLoading() {
    setLoaded(true);
  }

  return (
    <Box
      bgColor="white"
      borderRadius={4}
      p={2.5}
      pr={isListView ? 12 : 2.5}
      w="full"
      justifyContent="center"
    >
      <Stack direction={isListView ? 'row' : 'column'} space={isListView ? 2.5 : 1}>
        <Box>
          <Image
            size={isListView ? '100px' : '200px'}
            w={isListView ? undefined : 'full'}
            source={{
              uri: imageSource,
            }}
            bgColor="red"
            opacity={0.8}
            alt={title}
            resizeMode="cover"
            onLoadEnd={finishLoading}
          />

          <Center w="full" h="full" position="absolute" size={isListView ? '100px' : undefined}>
            {loaded && <PlayIcon />}

            <Box
              w="full"
              h="full"
              position="absolute"
              opacity={0.4}
              bgColor={loaded ? 'black' : 'white'}
            />

            {!loaded && <Loader />}
          </Center>
        </Box>

        <Column flex={1}>
          <Text fontWeight="medium" flexWrap="wrap">
            {title}
          </Text>
          <RenderHtml
            source={{ html: description }}
            baseStyle={{
              fontSize: '16px',
              color: 'black',
            }}
            contentWidth={htmlWidth}
            ignoredStyles={['fontFamily', 'backgroundColor', 'color']}
            renderers={{
              p: TruncatedPRenderer,
              body: TruncatedBodyRender,
            }}
          />
        </Column>
      </Stack>

      <Column
        position="absolute"
        right={isListView ? 4 : 6}
        top={isListView ? undefined : 6}
        alignItems="center"
        space={2.5}
      >
        {isViewed && <Box>{isListView ? <ViewedGreenIcon /> : <ViewedIcon />}</Box>}
        {isFavorite && <FavoriteIndicatorIcon bgColor={isListView ? '#9B57D3' : 'white'} />}
      </Column>
    </Box>
  );
}

export default VideoCard;
