import { Box, Column, Center } from 'native-base';

import { Loader } from '@app/components';
import { useFetchArticleTracksQuery } from '@features/MediaContent';

import { ArticleTrack, VitalArticles, FavoriteArticles } from '../components';
import { useNewContentIds } from '../hooks';

function Articles() {
  const { data: tracks, isFetching } = useFetchArticleTracksQuery();

  const newContentIds = useNewContentIds('articles');

  return (
    <Box flex={1} _android={{ mb: 4 }} mt={5}>
      {isFetching && (
        <Center w="full" h="full">
          <Loader />
        </Center>
      )}

      <Column space={5}>
        {tracks?.map(track => (
          <ArticleTrack
            key={track.id}
            title={track.name}
            summaries={track.items}
            hasNewContent={newContentIds.includes(track.id)}
          />
        ))}

        <VitalArticles />

        <FavoriteArticles />
      </Column>
    </Box>
  );
}

export default Articles;
