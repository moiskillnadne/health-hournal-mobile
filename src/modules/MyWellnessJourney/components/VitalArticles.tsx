import { Text } from 'native-base';

import { useFetchVitalArticlesQuery, useCheckNewVitalContentQuery } from '@features/MediaContent';

import { useTranslate } from '../hooks';

import Track from './Track';

function VitalArticles() {
  const t = useTranslate();

  const { data = [] } = useFetchVitalArticlesQuery();

  const { data: newVitalContent } = useCheckNewVitalContentQuery();

  return (
    <Track
      fallback={<Text color="white">{t('fallbacks.vital_articles')}</Text>}
      title={t('titles.my_vital_articles')}
      summaries={data}
      hasNewContent={newVitalContent?.articles}
    />
  );
}

export default VitalArticles;
