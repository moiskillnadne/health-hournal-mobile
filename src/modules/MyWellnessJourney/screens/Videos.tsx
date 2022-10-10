import { Box, Column, Center } from 'native-base';

import { Loader } from '@app/components';
import { useFetchVideoTracksQuery } from '@features/MediaContent';

import { VideoTrack, VitalVideos, FavoriteVideos } from '../components';
import { useNewContentIds } from '../hooks';

function Videos() {
  const { data: tracks, isFetching } = useFetchVideoTracksQuery();

  const newContentIds = useNewContentIds('videos');

  return (
    <Box flex={1} _android={{ mb: 4 }} mt={5}>
      {isFetching && (
        <Center w="full" h="full">
          <Loader />
        </Center>
      )}

      <Column space={5}>
        {tracks?.map(track => (
          <VideoTrack
            key={track.id}
            title={track.name}
            summaries={track.items}
            hasNewContent={newContentIds.includes(track.id)}
          />
        ))}

        <VitalVideos />

        <FavoriteVideos />
      </Column>
    </Box>
  );
}

export default Videos;
