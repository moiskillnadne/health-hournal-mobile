import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box, Center, Image, Text, Button } from 'native-base';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useParams } from 'react-router-native';
import RenderHtml from 'react-native-render-html';
import Orientation, {
  useDeviceOrientationChange,
  OrientationType,
} from 'react-native-orientation-locker';

import { useCommonTranslate } from '@app/hooks';
import { H1, Content, Loader, Logo, PinchZoomView } from '@app/components';

import {
  useFetchArticleQuery,
  useMarkAsViewed,
  useUpdateArticleMutation,
  useUpdateRecipeMutation,
} from '../hooks';

const PADDINGS_SIZE = 16;

const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
};

function Article() {
  const { id } = useParams();

  const globalT = useCommonTranslate();

  const { data: content, isLoading } = useFetchArticleQuery(id ?? skipToken);

  const useUpdateMutation = content?.isArticle ? useUpdateArticleMutation : useUpdateRecipeMutation;

  const [update, { isLoading: isTogglingFavoriteState }] = useUpdateMutation();

  const { width, height } = useWindowDimensions();

  const [currentOrientation, setCurrentOrientation] = useState(OrientationType['UNKNOWN']);

  const [imageHeight, setImageHeight] = useState(height / 4);

  const [loaded, setLoaded] = useState(false);

  function finishLoading() {
    setLoaded(true);
  }

  function toggleFavoriteState() {
    if (id && content) {
      update({
        id,
        isFavorite: !content.isFavorite,
      });
    }
  }

  const htmlWidth = width - PADDINGS_SIZE * 4;

  const buttonText = content?.isFavorite
    ? globalT('actions.remove_from_favorites')
    : globalT('actions.add_to_favorites');

  useMarkAsViewed(useUpdateMutation, id, !!content);

  useDeviceOrientationChange(orientation => {
    if (orientation !== OrientationType['UNKNOWN']) {
      if (
        orientation == OrientationType['LANDSCAPE-LEFT'] ||
        orientation == OrientationType['LANDSCAPE-RIGHT']
      ) {
        setCurrentOrientation(orientation);
        Orientation.lockToLandscape();
      } else {
        setCurrentOrientation(orientation);
        Orientation.lockToPortrait();
      }
    }
  });

  useEffect(() => {
    if (currentOrientation !== OrientationType['UNKNOWN']) {
      if (
        currentOrientation == OrientationType['LANDSCAPE-LEFT'] ||
        currentOrientation == OrientationType['LANDSCAPE-RIGHT']
      ) {
        setImageHeight(height / 2);
      } else {
        setImageHeight(height / 4);
      }
    }
  }, [currentOrientation, height]);

  useEffect(() => {
    return () => Orientation.lockToPortrait();
  }, []);

  return (
    <Box flex={1}>
      {content && (
        <PinchZoomView>
          <Content mt={5} flex={1}>
            <Box bgColor="white" borderRadius={4} flex={1}>
              <Box mb={5}>
                <Image
                  w="full"
                  h={imageHeight}
                  borderTopRadius={4}
                  source={{
                    uri: content.sourceUrl,
                  }}
                  alt={content.title}
                  resizeMode="cover"
                  onLoadEnd={finishLoading}
                />

                <H1 color="black" mt={5} px={4}>
                  {content.title}
                </H1>

                {!loaded && (
                  <Center w="full" h="full" position="absolute">
                    <Box w="full" h="full" position="absolute" bgColor="white" />

                    <Loader />
                  </Center>
                )}
              </Box>

              <Text px={4} mb={8}>
                {content.summary}
              </Text>

              <RenderHtml
                source={{ html: content.text }}
                baseStyle={{ fontSize: '16px', color: 'black', padding: '0 16px' }}
                contentWidth={htmlWidth}
                ignoredStyles={['fontFamily', 'backgroundColor', 'color']}
                renderersProps={renderersProps}
              />
            </Box>
          </Content>

          {isLoading && (
            <Center flex={1}>
              <Loader />
            </Center>
          )}

          {content && (
            <Content mt={5}>
              <Button onPress={toggleFavoriteState} isDisabled={isTogglingFavoriteState}>
                {buttonText}
              </Button>
            </Content>
          )}

          <Box w="full">
            <Logo />
          </Box>
        </PinchZoomView>
      )}
    </Box>
  );
}

export default Article;
