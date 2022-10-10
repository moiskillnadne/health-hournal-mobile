import { useState, memo } from 'react';
import { Box, Row, FlatList, Spinner, Pressable } from 'native-base';
import { useNavigate, useLocation } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { useFetchArticlesQuery } from '@features/MediaContent';
import { Article } from '@features/MediaContent/types';
import { GridSwitcher, useListView } from '@features/Lists';
import { Header, Content, BackArrow, Search, ArticleCard } from '@app/components';
import { useInfiniteScroll } from '@app/hooks';

import { useTranslate } from '../hooks';

function Articles() {
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
  } = useInfiniteScroll<Article>(useFetchArticlesQuery, {
    take: 50,
    search: debouncedSearchText,
  });

  function navigateArticle(articleId: string) {
    navigate(`${pathname}/${articleId}`);
  }

  function changeSearchText(value: string) {
    setSearchText(value);
  }

  return (
    <Box flex={1}>
      <Header
        title={t('titles.articles')}
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
            <Pressable pt={!index ? 2.5 : 0} onPress={() => navigateArticle(item.id)}>
              <ArticleCard
                type={viewType}
                title={item.title}
                description={item.summary}
                imageSource={item.sourceUrl}
                isFavorite={item.isFavorite}
                isVisited={item.isVisited}
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

export default memo(Articles);
