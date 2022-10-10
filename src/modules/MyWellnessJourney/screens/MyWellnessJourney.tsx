import { Box, Row, ScrollView } from 'native-base';
import { Outlet } from 'react-router-native';

import { useListView, GridSwitcher } from '@features/Lists';
import { Header, Content, BurgerIconButton, NotificationIconButton } from '@app/components';

import { useTranslate } from '../hooks';
import { Navigation } from '../components';

function MyWellnessJourney() {
  const t = useTranslate();

  const [viewType, setViewType] = useListView();

  return (
    <Box flex={1}>
      <Header
        title={t('titles.my_wellness_journey')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      <Content mt={4} _android={{ maxH: '44px' }}>
        <Row>
          <Navigation flex={1} mr={2} />

          <GridSwitcher value={viewType} onChange={setViewType} />
        </Row>
      </Content>

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Outlet />
      </ScrollView>
    </Box>
  );
}

export default MyWellnessJourney;
