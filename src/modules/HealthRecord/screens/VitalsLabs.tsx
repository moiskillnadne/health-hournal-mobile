import { Column, ScrollView } from 'native-base';

import { Content, Logo } from '@app/components';

import {
  WeightCard,
  BloodPressureCard,
  Hba1cCard,
  BloodSugarCard,
  CholesterolCard,
} from '../components';

function VitalsLabs() {
  return (
    <ScrollView>
      <Content mt={5}>
        <Column space={4}>
          <WeightCard />

          <BloodPressureCard />

          <BloodSugarCard />

          <Hba1cCard />

          <CholesterolCard />
        </Column>

        <Logo />
      </Content>
    </ScrollView>
  );
}

export default VitalsLabs;
