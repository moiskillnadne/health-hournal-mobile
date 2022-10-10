import { useMemo } from 'react';
import { Row, IBoxProps } from 'native-base';

import { useFetchNewContentTracksIdsQuery } from '@features/MediaContent';

import { useTranslate } from '../hooks';

import NavigationItem from './NavigationItem';

function Navigation(styledProps: IBoxProps) {
  const t = useTranslate();

  const { data: newContentTrackIds } = useFetchNewContentTracksIdsQuery();

  const navItems = useMemo(
    () => [
      {
        key: 'videos',
        title: t('titles.videos'),
        hasNewContent: newContentTrackIds ? newContentTrackIds.videos?.length > 0 : false,
      },
      {
        key: 'articles',
        title: t('titles.articles'),
        hasNewContent: newContentTrackIds ? newContentTrackIds.articles?.length > 0 : false,
      },
      {
        key: 'recipes',
        title: t('titles.recipes'),
        hasNewContent: newContentTrackIds ? newContentTrackIds.recipes?.length > 0 : false,
      },
    ],
    [t, newContentTrackIds],
  );

  return (
    <Row
      borderRadius={4}
      borderWidth={2}
      borderColor="white"
      bgColor="white"
      justifyContent="space-between"
      {...styledProps}
    >
      {navItems.map(navItem => (
        <NavigationItem key={navItem.key} id={navItem.key} hasIndicator={navItem.hasNewContent}>
          {navItem.title}
        </NavigationItem>
      ))}
    </Row>
  );
}

export default Navigation;
