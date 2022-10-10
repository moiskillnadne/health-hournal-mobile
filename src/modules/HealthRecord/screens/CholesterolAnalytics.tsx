import { useMemo, useState, useEffect } from 'react';
import { Box, ScrollView, Column, Center, Row, Divider, Pressable, Text } from 'native-base';
import { useLocation, useNavigate } from 'react-router-native';

import { Content, Logo, Loader, ErrorAlert } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { CHOLESTEROL_UNITS } from '@app/constants';

import {
  useTranslate,
  useLastCholesterol,
  useCholesterolAnalytics,
  useFetchLdlQuery,
  useFetchTriglyceridesQuery,
} from '../hooks';
import { AnalyticsHeader, TimeUnitSwitcher, RecordHistory, AreaChart } from '../components';
import { AddLdlLevel, AddTriglyceride } from '../components/form';
import { TimeUnit, Cholesterol } from '../types';

type CholesterolOption = {
  key: Cholesterol;
  title: string;
  Modal: typeof AddLdlLevel | typeof AddTriglyceride;
};

function CholesterolAnalytics() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const [tab, setTab] = useState<Cholesterol>('ldl');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('month');
  const [isModalOpen, setModalOpen] = useState(false);

  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const type = (state as { type: Cholesterol })?.type;

  const key = type ?? tab;

  const { lastValue, goalValue } = useLastCholesterol(key);

  const cholesterolOptions: CholesterolOption[] = useMemo(
    () => [
      {
        key: 'ldl',
        title: t('headers.ldl'),
        Modal: AddLdlLevel,
      },
      {
        key: 'triglycerides',
        title: t('headers.triglycerides'),
        Modal: AddTriglyceride,
      },
    ],
    [t],
  );

  const cholesterolContent = useMemo(() => {
    return cholesterolOptions.find(option => option.key === key) as CholesterolOption;
  }, [cholesterolOptions, key]);

  const {
    data: ldlAnalytics,
    isFetching: isFetchingLDL,
    error: ldlError,
  } = useFetchLdlQuery({
    period: timeUnit,
  });

  const {
    data: triglyceridesAnalytics,
    isFetching: isFetchingTriglycerides,
    error: triglyceridesError,
  } = useFetchTriglyceridesQuery({
    period: timeUnit,
  });

  const isFetching = isFetchingLDL || isFetchingTriglycerides;

  const cholesterolAnalytics = {
    ldl: ldlAnalytics,
    triglycerides: triglyceridesAnalytics,
  }[tab];

  const { analytics, minValue, maxValue, minDate, maxDate } = useCholesterolAnalytics(
    cholesterolAnalytics,
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

  const { Modal } = cholesterolContent;

  return (
    <>
      <Box flex={1} safeAreaLeft>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <AnalyticsHeader
            title={t('titles.cholesterol')}
            value={lastValue}
            goal={goalValue}
            goalMet={!!(goalValue && lastValue && lastValue <= goalValue)}
            unit={CHOLESTEROL_UNITS[measurementUnit]}
            onAdd={openModal}
            renderAddons={() => (
              <Center mt={4}>
                <Row
                  space="7"
                  divider={
                    <Divider orientation="vertical" width="2px" color="#e9e9e9" opacity={0.5} />
                  }
                >
                  {cholesterolOptions.map(option => (
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

              <RecordHistory unit={CHOLESTEROL_UNITS[measurementUnit]} records={analytics} />

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

      {ldlError && <ErrorAlert error={ldlError} />}
      {triglyceridesError && <ErrorAlert error={triglyceridesError} />}
    </>
  );
}

export default CholesterolAnalytics;
