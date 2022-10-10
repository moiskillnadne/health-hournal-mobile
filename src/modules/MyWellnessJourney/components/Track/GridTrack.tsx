import { Box, FlatList } from 'native-base';

import { ContentSummary } from '@features/MediaContent/types';
import { ViewedIcon } from '@app/components/icons';

import { TRACK_CARD_DIMENSIONS } from '../../constants';

import TrackItem from '../TrackItem';

import { Props } from './index';

const defaultRenderTrackItem = (item: ContentSummary) => (
  <TrackItem
    title={item.title}
    id={item.id}
    imageSource={item.preview}
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    pr={0}
  >
    {item.isVisited && (
      <Box position="absolute" top={1} right={1}>
        <ViewedIcon />
      </Box>
    )}
  </TrackItem>
);

const PADDING_LEFT = 16;

function GridTrack({
  summaries,
  renderTrackItem = defaultRenderTrackItem,
}: Omit<Props, 'title' | 'hasNewContent'>) {
  return (
    <FlatList
      horizontal
      data={summaries}
      scrollEnabled={summaries.length > 1}
      initialScrollIndex={0}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        const isFirst = index === 0;
        const isLast = index === summaries.length - 1;

        return (
          <>
            {isFirst && <Box w={4} />}

            <Box
              bgColor="white"
              p={2.5}
              mb={1}
              pr={isLast ? 2.5 : 0}
              borderBottomLeftRadius={isFirst ? 4 : 0}
              borderTopLeftRadius={isFirst ? 4 : 0}
              borderBottomRightRadius={isLast ? 4 : 0}
              borderTopRightRadius={isLast ? 4 : 0}
            >
              {renderTrackItem(item)}
            </Box>

            {isLast && <Box w={4} />}
          </>
        );
      }}
      getItemLayout={(_, index) => ({
        length: index ? TRACK_CARD_DIMENSIONS.WIDTH : TRACK_CARD_DIMENSIONS.WIDTH + PADDING_LEFT,
        offset: TRACK_CARD_DIMENSIONS.WIDTH * index + PADDING_LEFT,
        index,
      })}
    />
  );
}

export default GridTrack;
