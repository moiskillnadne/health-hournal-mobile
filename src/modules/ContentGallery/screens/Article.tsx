import { Box } from 'native-base';

import { Article } from '@features/MediaContent';
import { Header, BackArrow } from '@app/components';

import { useTranslate } from '../hooks';

export default function () {
  const t = useTranslate();

  return (
    <Box flex={1}>
      <Header title={t('titles.articles')} leftElement={<BackArrow />} />

      <Article />
    </Box>
  );
}
