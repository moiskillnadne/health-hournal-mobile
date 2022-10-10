import { useFetchFavoriteArticlesQuery } from '@features/MediaContent';

import { useTranslate } from '../hooks';

import Track from './Track';

function FavoriteArticles() {
  const t = useTranslate();

  const { data = [] } = useFetchFavoriteArticlesQuery();

  return data.length ? <Track title={t('titles.my_favorites')} summaries={data} /> : null;
}

export default FavoriteArticles;
