import { useState } from 'react';
import { Platform } from 'react-native';
import { Box } from 'native-base';

import { Video } from '@features/MediaContent';
import { Header, BackArrow } from '@app/components';

import { useTranslate } from '../hooks';

export default function () {
  const t = useTranslate();

  const [isFullscreen, setIsFullscreen] = useState(false);

  function onOrientationChange(isFullscreen: boolean) {
    if (Platform.OS === 'android') {
      setIsFullscreen(isFullscreen);
    }
  }

  return (
    <Box flex={1}>
      {!isFullscreen && (
        <Header title={t('titles.all_things_food_videos')} leftElement={<BackArrow />} />
      )}

      <Video onOrientationChange={onOrientationChange} />
    </Box>
  );
}
