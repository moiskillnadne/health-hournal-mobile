import { useState } from 'react';
import { Box, ScrollView, Column, Center, Text } from 'native-base';

import { Content, Logo, Loader, ErrorAlert } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { MASS_UNITS } from '@app/constants';

import { useTranslate, useLastWeight, useWeightAnalytics, useFetchWeightQuery } from '../hooks';
import { AnalyticsHeader, TimeUnitSwitcher, RecordHistory, AreaChart } from '../components';
import { AddWeight } from '../components/form';
import { TimeUnit } from '../types';

function WeightAnalytics() {
  const t = useTranslate();

  const [timeUnit, setTimeUnit] = useState<TimeUnit>('week');
  const [isModalOpen, setModalOpen] = useState(false);

  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const { lastValue, goalValue, bmi } = useLastWeight();

  const {
    data: weightAnalytics,
    isFetching,
    error,
  } = useFetchWeightQuery({
    period: timeUnit,
  });

  const { analytics, minValue, maxValue, minDate, maxDate } = useWeightAnalytics(
    weightAnalytics,
    timeUnit,
  );

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Box flex={1} safeAreaLeft>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <AnalyticsHeader
            title={t('titles.weight')}
            value={lastValue}
            goal={goalValue}
            goalMet={lastValue <= goalValue}
            unit={MASS_UNITS[measurementUnit]}
            onAdd={openModal}
            extraInfo={
              <Text color="white" mb={1}>
                {t('bmi')}: {bmi}
              </Text>
            }
          />
          <Content mt={5} flex={1}>
            <Column space={2.5} flex={1}>
              <TimeUnitSwitcher value={timeUnit} onChange={setTimeUnit} />

              {analytics.length > 0 && (
                <AreaChart
                  data={analytics}
                  minDate={minDate}
                  maxDate={maxDate}
                  minValue={minValue}
                  maxValue={maxValue}
                />
              )}

              <RecordHistory unit={MASS_UNITS[measurementUnit]} records={analytics} />

              {isFetching && (
                <Center flex={1}>
                  <Loader />
                </Center>
              )}
            </Column>
          </Content>

          <Logo />
        </ScrollView>
      </Box>

      {isModalOpen && (
        <AddWeight unit={measurementUnit} onClose={closeModal} goalValue={goalValue} />
      )}

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default WeightAnalytics;
