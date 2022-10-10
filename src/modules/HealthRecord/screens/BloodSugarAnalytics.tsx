import { useMemo, useState, useEffect } from 'react';
import { Box, ScrollView, Column, Center, Row, Divider, Pressable, Text } from 'native-base';
import { useLocation, useNavigate } from 'react-router-native';

import { Content, Logo, Loader, ErrorAlert } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { BLOOD_SUGAR_UNITS } from '@app/constants';

import {
  useTranslate,
  useLastBloodSugar,
  useBloodAnalytics,
  useFetchRandomBloodSugarQuery,
  useFetchFastingBloodSugarQuery,
  useFetchAfterMealBloodSugarQuery,
} from '../hooks';
import { AnalyticsHeader, TimeUnitSwitcher, RecordHistory, AreaChart } from '../components';
import {
  AddRandomBloodSugar,
  AddFastingBloodSugar,
  AddAfterMealBloodSugar,
} from '../components/form';
import { TimeUnit, BloodTest } from '../types';

type BloodTestOption = {
  key: BloodTest;
  title: string;
  Modal: typeof AddRandomBloodSugar | typeof AddFastingBloodSugar | typeof AddAfterMealBloodSugar;
};

function BloodSugarAnalytics() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const [tab, setTab] = useState<BloodTest>('random');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('week');
  const [isModalOpen, setModalOpen] = useState(false);

  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const type = (state as { type: BloodTest })?.type;

  const key = type ?? tab;

  const { lastValue, goalValue } = useLastBloodSugar(key);

  const bloodTestOptions: BloodTestOption[] = useMemo(
    () => [
      {
        key: 'random',
        title: t('headers.random'),
        Modal: AddRandomBloodSugar,
      },
      {
        key: 'fasting',
        title: t('headers.fasting'),
        Modal: AddFastingBloodSugar,
      },
      {
        key: 'after-meal',
        title: t('headers.after_meal'),
        Modal: AddAfterMealBloodSugar,
      },
    ],
    [t],
  );

  const bloodTestContent = useMemo(() => {
    return bloodTestOptions.find(option => option.key === key) as BloodTestOption;
  }, [bloodTestOptions, key]);

  const {
    data: randomBloodSugarAnalytics,
    isFetching: isFetchingRandomBloodSugar,
    error: randomError,
  } = useFetchRandomBloodSugarQuery({
    period: timeUnit,
  });

  const {
    data: fastingBloodSugarAnalytics,
    isFetching: isFetchingFastingBloodSugar,
    error: fastingError,
  } = useFetchFastingBloodSugarQuery({
    period: timeUnit,
  });

  const {
    data: afterMealBloodSugarAnalytics,
    isFetching: isFetchingAfterMealBloodSugar,
    error: afterMealError,
  } = useFetchAfterMealBloodSugarQuery({
    period: timeUnit,
  });

  const isFetching =
    isFetchingRandomBloodSugar || isFetchingFastingBloodSugar || isFetchingAfterMealBloodSugar;

  const bloodSugarAnalytics = {
    random: randomBloodSugarAnalytics,
    fasting: fastingBloodSugarAnalytics,
    'after-meal': afterMealBloodSugarAnalytics,
  }[tab];

  const { analytics, minValue, maxValue, minDate, maxDate } = useBloodAnalytics(
    bloodSugarAnalytics,
    timeUnit,
  );

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    if (type) {
      setTab(type);

      navigate(pathname, { replace: true });
    }
  }, [type, navigate, pathname]);

  const { Modal } = bloodTestContent;

  return (
    <>
      <Box flex={1} safeAreaLeft>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <AnalyticsHeader
            title={t('titles.blood_sugar')}
            value={lastValue}
            goal={goalValue}
            goalMet={!!(goalValue && lastValue && lastValue <= goalValue)}
            unit={BLOOD_SUGAR_UNITS[measurementUnit]}
            onAdd={openModal}
            renderAddons={() => (
              <Center mt={4}>
                <Row
                  space="7"
                  divider={
                    <Divider orientation="vertical" width="2px" color="#e9e9e9" opacity={0.5} />
                  }
                >
                  {bloodTestOptions.map(option => (
                    <Pressable key={option.title} py={0.5} onPress={() => setTab(option.key)}>
                      <Text color="white" fontWeight={tab === option.key ? 'medium' : 'normal'}>
                        {option.title}
                      </Text>
                    </Pressable>
                  ))}
                </Row>
              </Center>
            )}
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

              <RecordHistory unit={BLOOD_SUGAR_UNITS[measurementUnit]} records={analytics} />

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

      {isModalOpen && <Modal onClose={closeModal} goalValue={goalValue} />}

      {randomError && <ErrorAlert error={randomError} />}
      {fastingError && <ErrorAlert error={fastingError} />}
      {afterMealError && <ErrorAlert error={afterMealError} />}
    </>
  );
}

export default BloodSugarAnalytics;
