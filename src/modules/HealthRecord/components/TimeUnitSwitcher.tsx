import { PropsWithChildren } from 'react';

import { Pressable, Row, Center, Text } from 'native-base';

import { useTranslate } from '../hooks';
import { TimeUnit } from '../types';

type Props = {
  value: TimeUnit;
  timeUnits?: TimeUnit[];
  onChange: (value: TimeUnit) => unknown;
};

type ButtonProps = {
  isActive: boolean;
  onPress: () => unknown;
};

function Button({ isActive, onPress, children }: PropsWithChildren<ButtonProps>) {
  return (
    <Pressable onPress={onPress} flexGrow={1} flexShrink={0} flexBasis="auto">
      <Center borderRadius={4} padding={2} bgColor={isActive ? 'secondary.500' : 'white'}>
        <Text color={isActive ? 'white' : 'black'} fontWeight={isActive ? 'medium' : 'normal'}>
          {children}
        </Text>
      </Center>
    </Pressable>
  );
}

function TimeUnitSwitcher({ value, timeUnits = ['week', 'month', 'year'], onChange }: Props) {
  const t = useTranslate();

  function chooseWeek() {
    onChange('week');
  }

  function chooseMonth() {
    onChange('month');
  }

  function chooseYear() {
    onChange('year');
  }

  return (
    <Row
      borderRadius={4}
      borderWidth={2}
      borderColor="white"
      bgColor="white"
      justifyContent="space-between"
    >
      {timeUnits.includes('week') && (
        <Button isActive={value === 'week'} onPress={chooseWeek}>
          {t('time_units.week')}
        </Button>
      )}

      {timeUnits.includes('month') && (
        <Button isActive={value === 'month'} onPress={chooseMonth}>
          {t('time_units.month')}
        </Button>
      )}

      {timeUnits.includes('year') && (
        <Button isActive={value === 'year'} onPress={chooseYear}>
          {t('time_units.year')}
        </Button>
      )}
    </Row>
  );
}

export default TimeUnitSwitcher;
