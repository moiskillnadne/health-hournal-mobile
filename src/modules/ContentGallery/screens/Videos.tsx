import { useState, memo } from 'react';
import { Box, Row, FlatList, Spinner, Pressable } from 'native-base';
import { useNavigate, useLocation } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { useFetchVideosQuery } from '@features/MediaContent';
import { Video } from '@features/MediaContent/types';
import { GridSwitcher, useListView } from '@features/Lists';
import { Header, Content, BackArrow, Search, VideoCard } from '@app/components';
import { useInfiniteScroll } from '@app/hooks';

import { useTranslate } from '../hooks';

function Videos() {
  const t = useTranslate();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [viewType, setViewType] = useListView();

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const {
    data: articles,
    loadMore,
    isFetching,
  } = useInfiniteScroll<Video>(useFetchVideosQuery, {
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
        title={t('titles.videos')}
        leftElement={<BackArrow />}
        _addonsContainer={{ mx: 4, mb: 2 }}
        renderAddons={() => <Search value={searchText} onChange={changeSearchText} />}
      />

      <Content my={4} flex={1}>
        <Row>
          <GridSwitcher flex={1} value={viewType} onChange={setViewType} />
        </Row>

        <FlatList
          data={articles}
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

export default memo(Videos);
