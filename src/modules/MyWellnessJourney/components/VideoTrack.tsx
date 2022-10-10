import { Box, Center } from 'native-base';

import { useListView } from '@features/Lists';
import { ContentSummary } from '@features/MediaContent/types';
import { ViewedIcon, ViewedGreenIcon } from '@app/components/icons';

import { PlayIcon } from './icons';
import Track from './Track';
import TrackItem from './TrackItem';

type Props = {
  title: string;
  fallback?: JSX.Element;
  hasNewContent?: boolean;
  summaries: ContentSummary[];
};

function VideoTrack({ title, fallback, summaries, hasNewContent }: Props) {
  const [viewType] = useListView();

  return (
    <Track
      title={title}
      fallback={fallback}
      hasNewContent={hasNewContent}
      summaries={summaries}
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
            {viewType === 'grid' && (
              <>
                <Center position="absolute" w="full" h="full" opacity={0.6}>
                  <PlayIcon />
                </Center>

                {item.isViewed && (
                  <Box position="absolute" top={1} right={1}>
                    <ViewedIcon />
                  </Box>
                )}
              </>
            )}

            {viewType === 'list' && item.isViewed && (
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

export default VideoTrack;
