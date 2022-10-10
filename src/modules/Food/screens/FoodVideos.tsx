import { useState, memo } from 'react';
import { Box, Row, FlatList, Spinner, Pressable, Text } from 'native-base';
import { useDebounce } from 'use-debounce';
import { useNavigate, useLocation } from 'react-router-native';

import { useFetchFoodVideosQuery } from '@features/MediaContent';
import { Header, BackArrow, Content, Search, VideoCard } from '@app/components';
import { GridSwitcher, useListView } from '@features/Lists';
import { Video } from '@features/MediaContent/types';
import { useInfiniteScroll } from '@app/hooks';

import { useTranslate } from '../hooks';

function FoodVideos() {
  const t = useTranslate();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [viewType, setViewType] = useListView();

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const {
    data: videos,
    loadMore,
    isFetching,
  } = useInfiniteScroll<Video>(useFetchFoodVideosQuery, {
    take: 50,
    search: debouncedSearchText,
  });

  function navigateVideo(videoId: string) {
    navigate(`${pathname}/${videoId}`);
  }

  function changeSearchText(value: string) {
    setSearchText(value);
  }

  return (
    <Box flex={1}>
      <Header
        title={t('titles.all_things_food_videos')}
        leftElement={<BackArrow />}
        _addonsContainer={{ mx: 4, mb: 2 }}
        renderAddons={() => <Search value={searchText} onChange={changeSearchText} />}
      />

      <Content my={4} flex={1}>
        <Row>
          <GridSwitcher flex={1} value={viewType} onChange={setViewType} />
        </Row>

        {videos.length === 0 && debouncedSearchText && !isFetching ? (
          <Text mt={4} fontSize={18} color="white" textAlign="center">
            {t('no_results_found')}
          </Text>
        ) : null}

        <FlatList
          data={videos}
          ItemSeparatorComponent={() => <Box h="10px" />}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => navigateVideo(item.id)} pt={!index ? 2.5 : 0}>
              <VideoCard
                type={viewType}
                title={item.title}
                description={item.description}
                imageSource={item.sourceUrl}
                isFavorite={item.isFavorite}
                isViewed={item.isViewed}
              />
            </Pressable>
          )}
          ListFooterComponent={isFetching ? <Spinner mt={4} size="lg" color="white" /> : null}
          onEndReached={loadMore}
        />
      </Content>
    </Box>
  );
}

export default memo(FoodVideos);
