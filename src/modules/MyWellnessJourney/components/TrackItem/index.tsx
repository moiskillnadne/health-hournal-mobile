import { PropsWithChildren } from 'react';

import { IBoxProps, Pressable } from 'native-base';
import { useNavigate, useResolvedPath } from 'react-router-native';

import { useListView } from '@features/Lists';

import GridTrackItem from './GridTrackItem';
import ListTrackItem from './ListTrackItem';

export type Props = PropsWithChildren<{
  id: string;
  title: string;
  imageSource: string;
}> &
  IBoxProps;

function TrackItem({ id, title, imageSource, children, ...stylesProps }: Props) {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath(id);

  const [viewType] = useListView();

  function navigateContent() {
    navigate(pathname);
  }

  return (
    <Pressable onPress={navigateContent}>
      {viewType === 'grid' ? (
        <GridTrackItem title={title} imageSource={imageSource}>
          {children}
        </GridTrackItem>
      ) : (
        <ListTrackItem title={title} {...stylesProps}>
          {children}
        </ListTrackItem>
      )}
    </Pressable>
  );
}

export default TrackItem;
