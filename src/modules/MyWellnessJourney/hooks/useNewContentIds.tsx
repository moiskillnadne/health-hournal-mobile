import { useFetchNewContentTracksIdsQuery } from '@features/MediaContent';

function useNewContentIds(type: 'videos' | 'articles' | 'recipes') {
  const { data: newContentTrackIds } = useFetchNewContentTracksIdsQuery();

  return newContentTrackIds?.[type] ?? [];
}

export default useNewContentIds;
