import { Text } from 'native-base';

import { useFetchVitalVideosQuery, useCheckNewVitalContentQuery } from '@features/MediaContent';

import { useTranslate } from '../hooks';

import VideoTrack from './VideoTrack';

function VitalVideos() {
  const t = useTranslate();

  const { data = [] } = useFetchVitalVideosQuery();

  const { data: newVitalContent } = useCheckNewVitalContentQuery();

  return (
    <VideoTrack
      fallback={<Text color="white">{t('fallbacks.vital_videos')}</Text>}
      title={t('titles.my_vital_videos')}
      summaries={data}
      hasNewContent={newVitalContent?.videos}
    />
  );
}

export default VitalVideos;
