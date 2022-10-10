import { Box, ScrollView, Row, Column } from 'native-base';

import { Header, BurgerIconButton, Content, Logo, NotificationIconButton } from '@app/components';

import { useTranslate } from '../hooks';
import { WeightCard, WaterCard, StepsCard, SleepCard } from '../components';

function LifestyleTracker() {
  const t = useTranslate();

  return (
    <Box flex={1}>
      <Header
        title={t('titles.lifestyle_tracker')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Content mt={5} flex={1}>
          <Column space={4}>
            <Row space={4}>
              <WeightCard />

              <WaterCard />
            </Row>

            <Row space={4}>
              <StepsCard />

              <SleepCard />
            </Row>
          </Column>
        </Content>

        <Logo />
      </ScrollView>
    </Box>
  );
}

export default LifestyleTracker;
