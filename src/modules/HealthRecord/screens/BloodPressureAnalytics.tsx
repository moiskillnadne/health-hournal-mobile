import { useState, useMemo } from 'react';
import { Box, ScrollView, Column, Center } from 'native-base';

import { Content, Logo, Loader, ErrorAlert } from '@app/components';
import { BLOOD_PRESSURE_UNIT } from '@app/constants';

import {
  useTranslate,
  useLastBloodPressure,
  useBloodPressureAnalytics,
  useFetchBloodPressureQuery,
} from '../hooks';
import {
  AnalyticsHeader,
  TimeUnitSwitcher,
  RecordHistory,
  MultipleStrokesAreaChart,
} from '../components';
import { AddBloodPressure } from '../components/form';
import { TimeUnit } from '../types';
import { formatPressure } from '../utils';

function BloodPressureAnalytics() {
  const t = useTranslate();

  const [timeUnit, setTimeUnit] = useState<TimeUnit>('week');
  const [isModalOpen, setModalOpen] = useState(false);

  const { lastValue: lastBloodPressure, goalValue: goalBloodPressure } = useLastBloodPressure();

  const lastValue =
    lastBloodPressure.systolic && lastBloodPressure.diastolic
      ? formatPressure(lastBloodPressure.systolic, lastBloodPressure.diastolic)
      : undefined;
  const goalValue =
    goalBloodPressure.systolic && goalBloodPressure.diastolic
      ? formatPressure(goalBloodPressure.systolic, goalBloodPressure.diastolic)
      : undefined;

  const { data, isFetching, error } = useFetchBloodPressureQuery({
    period: timeUnit,
  });

  const { systolic: systolicAnalytics, diastolic: diastolicAnalytics } = useBloodPressureAnalytics(
    data,
    timeUnit,
  );

  const flattenAnalytics = useMemo(() => {
    return (
      data?.map(item => {
        return {
          value: `${item.value.systolic}/${item.value.diastolic} ${BLOOD_PRESSURE_UNIT}`,
          date: new Date(item.datetime),
        };
      }) ?? []
    );
  }, [data]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const analytics = useMemo(
    () => [systolicAnalytics, diastolicAnalytics],
    [diastolicAnalytics, systolicAnalytics],
  );

  return (
    <>
      <Box flex={1} safeAreaLeft>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <AnalyticsHeader
            title={t('titles.blood_pressure')}
            value={lastValue}
            goal={goalValue}
            goalMet={
              !!(
                lastBloodPressure.systolic &&
                goalBloodPressure.systolic &&
                lastBloodPressure.diastolic &&
                goalBloodPressure.diastolic &&
                lastBloodPressure.systolic <= goalBloodPressure.systolic &&
                lastBloodPressure.diastolic <= goalBloodPressure.diastolic
              )
            }
            unit={BLOOD_PRESSURE_UNIT}
            onAdd={openModal}
          />
          <Content mt={5} flex={1}>
            <Column space={2.5} flex={1}>
              <TimeUnitSwitcher value={timeUnit} onChange={setTimeUnit} />

              {flattenAnalytics.length > 0 && <MultipleStrokesAreaChart strokes={analytics} />}

              <RecordHistory unit={BLOOD_PRESSURE_UNIT} records={flattenAnalytics} />

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
        <AddBloodPressure
          onClose={closeModal}
          goalSystolic={goalBloodPressure.systolic}
          goalDiastolic={goalBloodPressure.diastolic}
        />
      )}

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default BloodPressureAnalytics;
