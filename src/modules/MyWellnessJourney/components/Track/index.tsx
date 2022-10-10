import { Box, Row, Circle } from 'native-base';

import { H1, Content } from '@app/components';
import { useListView } from '@features/Lists';
import { ContentSummary } from '@features/MediaContent/types';

import GridTrack from './GridTrack';
import ListTrack from './ListTrack';

export type Props = {
  title: string;
  fallback?: JSX.Element;
  summaries: ContentSummary[];
  hasNewContent?: boolean;
  renderTrackItem?: (item: ContentSummary, index?: number, items?: ContentSummary[]) => JSX.Element;
};

function Track({ title, fallback, summaries, hasNewContent, renderTrackItem }: Props) {
  const [viewType] = useListView();

  return (
    <Box>
      <Row mb={2.5} mx={4} alignItems="center">
        <H1 alignItems="center">{title}</H1>

        {hasNewContent && <Circle size={2} bg="#f23836" ml={1} />}
      </Row>

      <Box mx={viewType === 'list' ? 4 : 0}>
        {viewType === 'grid' && (
          <GridTrack summaries={summaries} renderTrackItem={renderTrackItem} />
        )}

        {viewType === 'list' && (
          <ListTrack summaries={summaries} renderTrackItem={renderTrackItem} />
        )}
      </Box>

      {!summaries.length && fallback && <Content>{fallback}</Content>}
    </Box>
  );
}

export default Track;
