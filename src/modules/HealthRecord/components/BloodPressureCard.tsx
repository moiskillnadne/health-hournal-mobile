import { useState } from 'react';
import { Box, Pressable } from 'native-base';
import { useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { BLOOD_PRESSURE_UNIT } from '@app/constants';
import { noop } from '@app/utils';
import { useAppSelector } from '@app/hooks';

import { useFetchLastBloodPressureQuery, useTranslate } from '../hooks';
import { formatPressure } from '../utils';
import { selectBloodPressure } from '../state';

import { AddBloodPressure } from './form';
// import Reminder from './Reminder';
import CardContent from './CardContent';

function BloodPressureCard() {
  const t = useTranslate();
  const navigate = useNavigate();

  const isConnected = useIsConnected();

  const [isModalOpen, setModalOpen] = useState(false);

  const lastBloodPressure = useAppSelector(selectBloodPressure);

  useFetchLastBloodPressureQuery();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const value = formatPressure(lastBloodPressure.systolic, lastBloodPressure.diastolic);

  const goalValue = formatPressure(
    lastBloodPressure.goalPressureSystolic,
    lastBloodPressure.goalPressureDiastolic,
  );

  function navigateBloodPressureAnalytics() {
    navigate('/private/health-record/blood_pressure_analytics');
  }

  return (
    <Box bgColor="white" rounded={4}>
      {/* TODO: Uncomment and implement when the reminder is ready. Now only the UI part is ready.
      <Box borderBottomWidth={1} borderColor="#e9e9e9">
        <Reminder />
      </Box> */}

      <Box p={1}>
        <Pressable onPress={isConnected ? navigateBloodPressureAnalytics : noop}>
          <CardContent
            title={t('titles.blood_pressure')}
            date={lastBloodPressure.datetime}
            value={value}
            unit={BLOOD_PRESSURE_UNIT}
            goalValue={goalValue}
            goalUnit={BLOOD_PRESSURE_UNIT}
            onAdd={openModal}
          />
        </Pressable>
      </Box>
      {isModalOpen ? (
        <AddBloodPressure
          onClose={closeModal}
          goalSystolic={lastBloodPressure.goalPressureSystolic}
          goalDiastolic={lastBloodPressure.goalPressureDiastolic}
        />
      ) : null}
    </Box>
  );
}

export default BloodPressureCard;
