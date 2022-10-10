import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box, ScrollView, Center, Button } from 'native-base';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useParams } from 'react-router-native';
import Orientation, {
  useDeviceOrientationChange,
  OrientationType,
} from 'react-native-orientation-locker';
import RenderHtml from 'react-native-render-html';

import { useCommonTranslate } from '@app/hooks';
import { H1, VideoPlayer, Content, Loader, Logo } from '@app/components';

import { useFetchVideoQuery, useUpdateVideoMutation, useMarkAsViewed } from '../hooks';

const PADDINGS_SIZE = 16;

type Props = {
  onOrientationChange?: (isFullscreen: boolean) => unknown;
};

function Video({ onOrientationChange }: Props) {
  const { id } = useParams();

  const globalT = useCommonTranslate();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const { data: content, isLoading } = useFetchVideoQuery(id ?? skipToken);

  const { width } = useWindowDimensions();

  const [update, { isLoading: isTogglingFavoriteState }] = useUpdateVideoMutation();

  const htmlWidth = width - PADDINGS_SIZE * 2;

  useDeviceOrientationChange(orientation => {
    const isFullscreen =
      orientation !== OrientationType['UNKNOWN'] && orientation !== OrientationType['PORTRAIT'];

    setIsFullscreen(isFullscreen);
    onOrientationChange?.(isFullscreen);
  });

  function onEnd() {
    if (id) {
      update({
        id,
        isViewed: true,
      });
    }
  }

  function toggleFavoriteState() {
    if (id && content) {
      update({
        id,
        isFavorite: !content.isFavorite,
      });
    }
  }

  const buttonText = content?.isFavorite
    ? globalT('actions.remove_from_favorites')
    : globalT('actions.add_to_favorites');

  useMarkAsViewed(useUpdateVideoMutation, id);

  useEffect(() => {
    return () => Orientation.lockToPortrait();
  }, []);

  return (
    <Box flex={1}>
      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        {content && (
          <Box flex={1}>
            <VideoPlayer h="219px" source={{ uri: content.sourceUrl }} onEnd={onEnd} />

            <Content mt={5} flex={1}>
              <Box bgColor="white" borderRadius={4} flex={1} p={4}>
                <H1 color="black" mb={5}>
                  {content.title}
                </H1>

                <RenderHtml
                  source={{ html: content.description }}
                  baseStyle={{ fontSize: '16px', color: 'black' }}
                  contentWidth={htmlWidth}
                  ignoredStyles={['fontFamily', 'backgroundColor', 'color']}
                />
              </Box>
            </Content>
          </Box>
        )}

        {isLoading && (
          <Center flex={1}>
            <Loader />
          </Center>
        )}

        {!isFullscreen && content && (
          <Content mt={5}>
            <Button onPress={toggleFavoriteState} isDisabled={isTogglingFavoriteState}>
              {buttonText}
            </Button>
          </Content>
        )}

        {!isFullscreen && <Logo />}
      </ScrollView>
    </Box>
  );
}

export default Video;
