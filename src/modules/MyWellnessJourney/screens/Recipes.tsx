import { Box, Column, Center } from 'native-base';

import { Loader } from '@app/components';
import { useFetchRecipeTracksQuery } from '@features/MediaContent';

import { ArticleTrack, FavoriteRecipes } from '../components';
import { useNewContentIds } from '../hooks';

function Recipes() {
  const { data: tracks, isFetching } = useFetchRecipeTracksQuery();

  const newContentIds = useNewContentIds('recipes');

  return (
    <Box flex={1} _android={{ mb: 4 }} mt={5}>
      {isFetching && (
        <Center w="full" h="full">
          <Loader />
        </Center>
      )}

      <Column space={5}>
        {tracks?.map((track, i) => (
          <ArticleTrack
            key={track.id}
            title={track.name}
            summaries={track.items}
            hasNewContent={newContentIds.includes(track.id)}
          />
        ))}

        <FavoriteRecipes />
      </Column>
    </Box>
  );
}

export default Recipes;
