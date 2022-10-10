import { useFetchFavoriteVideosQuery } from '@features/MediaContent';

import { useTranslate } from '../hooks';

import VideoTrack from './VideoTrack';

function FavoriteVideos() {
  const t = useTranslate();

  const { data = [] } = useFetchFavoriteVideosQuery();

  return data.length ? <VideoTrack title={t('titles.my_favorites')} summaries={data} /> : null;
}

export default FavoriteVideos;
