import { useState } from 'react';
import { Box, ScrollView, Column, Center } from 'native-base';

import { Content, Logo, Loader, ErrorAlert } from '@app/components';

import { useTranslate, useLastHbA1c, useHbA1cAnalytics, useFetchHba1cQuery } from '../hooks';
import { AnalyticsHeader, TimeUnitSwitcher, RecordHistory, AreaChart } from '../components';
import { AddHba1c } from '../components/form';
import { TimeUnit } from '../types';
import { HBA1C_UNIT } from '../constants';

function HbA1cAnalytics() {
  const t = useTranslate();

  const [timeUnit, setTimeUnit] = useState<TimeUnit>('month');
  const [isModalOpen, setModalOpen] = useState(false);

  const { lastValue, goalValue } = useLastHbA1c();

  const { data, isFetching, error } = useFetchHba1cQuery({
    period: timeUnit,
  });

  const { analytics, minValue, maxValue, minDate, maxDate } = useHbA1cAnalytics(data, timeUnit);

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
            title={t('titles.hba1c')}
            value={lastValue}
            goal={goalValue}
            goalMet={!!(lastValue && goalValue && lastValue <= goalValue)}
            unit={HBA1C_UNIT}
            onAdd={openModal}
          />
          <Content mt={5} flex={1}>
            <Column space={2.5} flex={1}>
              <TimeUnitSwitcher
                value={timeUnit}
                onChange={setTimeUnit}
                timeUnits={['month', 'year']}
              />

              {analytics.length > 0 && (
                <AreaChart
                  data={analytics}
                  minDate={minDate}
                  maxDate={maxDate}
                  minValue={minValue}
                  maxValue={maxValue}
                />
              )}

              <RecordHistory unit={HBA1C_UNIT} records={analytics} />

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

      {isModalOpen && <AddHba1c onClose={closeModal} goalValue={goalValue} />}

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default HbA1cAnalytics;
