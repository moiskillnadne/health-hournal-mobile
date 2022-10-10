import { useState, useMemo, useEffect } from 'react';
import { Divider, Pressable, Center, Box, Text, Column } from 'native-base';

import { useListView } from '@features/Lists';
import { ContentSummary } from '@features/MediaContent/types';
import { ViewedGreenIcon } from '@app/components/icons';

import { useTranslate } from '../../hooks';

import TrackItem from '../TrackItem';

import { Props } from './index';

const ITEMS_COUNT_STEP = 4;

const defaultRenderTrackItem = (item: ContentSummary) => {
  return (
    <TrackItem
      title={item.title}
      id={item.id}
      imageSource={item.preview}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pr={8}
    >
      {item.isVisited && (
        <Box position="absolute" top={3} right={3}>
          <ViewedGreenIcon />
        </Box>
      )}
    </TrackItem>
  );
};

function ListTrack({
  summaries,
  renderTrackItem = defaultRenderTrackItem,
}: Omit<Props, 'title' | 'hasNewContent'>) {
  const t = useTranslate();
  const [viewType] = useListView();

  const [itemsCountToShow, setItemsCountToShow] = useState(ITEMS_COUNT_STEP);

  const shouldShowSeeMoreButton = (summaries.length - itemsCountToShow) / ITEMS_COUNT_STEP > 0;

  const reducedSummaries = useMemo(
    () => summaries.slice(0, itemsCountToShow),
    [itemsCountToShow, summaries],
  );

  function seeMore() {
    setItemsCountToShow(prevState => prevState + ITEMS_COUNT_STEP);
  }

  useEffect(() => {
    if (viewType === 'list') {
      setItemsCountToShow(ITEMS_COUNT_STEP);
    }
  }, [viewType]);

  const mapper = (item: ContentSummary, index = 0, items: ContentSummary[] = []) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;

    return (
      <Box
        key={item.id}
        borderTopRadius={isFirst ? 4 : 0}
        borderBottomRadius={isLast && !shouldShowSeeMoreButton ? 4 : 0}
        bgColor="white"
      >
        {renderTrackItem(item, index, items)}
      </Box>
    );
  };

  return (
    <>
      <Column borderRadius={4} divider={<Divider />}>
        {reducedSummaries.map(mapper)}
      </Column>

      {shouldShowSeeMoreButton && (
        <Pressable bgColor="#f2f2f2" onPress={seeMore} borderBottomRadius={4}>
          <Center py="14px">
            <Text fontWeight="medium" color="primary.500">
              {t('buttons.see_more')}
            </Text>
          </Center>
        </Pressable>
      )}
    </>
  );
}

export default ListTrack;
