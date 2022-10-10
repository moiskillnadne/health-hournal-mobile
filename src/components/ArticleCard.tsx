import { useState } from 'react';

import { Box, Stack, Center, Column, Text, Image } from 'native-base';

import { Loader } from '@app/components';

import { FavoriteIndicatorIcon, ViewedIcon, ViewedGreenIcon } from './icons';

type Props = {
  type: 'grid' | 'list';
  imageSource: string;
  title: string;
  description: string;
  isFavorite: boolean;
  isVisited: boolean;
};

function ArticleCard({
  imageSource,
  title,
  description,
  type = 'list',
  isFavorite,
  isVisited,
}: Props) {
  const isListView = type === 'list';

  const [loaded, setLoaded] = useState(false);

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

          {!loaded && (
            <Center w="full" h="full" position="absolute">
              <Box w="full" h="full" position="absolute" bgColor="white" />

              <Loader />
            </Center>
          )}
        </Box>

        <Column space={1} flex={1}>
          <Text fontWeight="medium" flexWrap="wrap">
            {title}
          </Text>
          <Text numberOfLines={2}>{description}</Text>
        </Column>
      </Stack>

      <Column
        position="absolute"
        right={isListView ? 4 : 6}
        top={isListView ? undefined : 6}
        alignItems="center"
        space={2.5}
      >
        {isVisited && <Box>{isListView ? <ViewedGreenIcon /> : <ViewedIcon />}</Box>}
        {isFavorite && <FavoriteIndicatorIcon bgColor={isListView ? '#9B57D3' : 'white'} />}
      </Column>
    </Box>
  );
}

export default ArticleCard;
