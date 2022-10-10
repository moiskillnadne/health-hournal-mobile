import { Box } from 'native-base';

import { useListView } from '@features/Lists';
import { ContentSummary } from '@features/MediaContent/types';
import { ViewedIcon, ViewedGreenIcon } from '@app/components/icons';

import Track from './Track';
import TrackItem from './TrackItem';

type Props = {
  title: string;
  fallback?: JSX.Element;
  hasNewContent?: boolean;
  summaries: ContentSummary[];
};

function ArticleTrack({ title, fallback, summaries, hasNewContent }: Props) {
  const [viewType] = useListView();

  return (
    <Track
      title={title}
      fallback={fallback}
      summaries={summaries}
      hasNewContent={hasNewContent}
      renderTrackItem={item => {
        return (
          <TrackItem
            title={item.title}
            id={item.id}
            imageSource={item.preview}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pr={viewType === 'list' ? 8 : 0}
          >
            {viewType === 'grid' && item.isVisited && (
              <Box position="absolute" top={1} right={1}>
                <ViewedIcon />
              </Box>
            )}

            {viewType === 'list' && item.isVisited && (
              <Box position="absolute" top={3} right={3}>
                <ViewedGreenIcon />
              </Box>
            )}
          </TrackItem>
        );
      }}
    />
  );
}

export default ArticleTrack;
