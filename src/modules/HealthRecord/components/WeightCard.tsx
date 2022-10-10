import { useState } from 'react';
import { Box, Pressable } from 'native-base';
import { useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { useCommonTranslate, useAppSelector, useFetchLastWeightQuery } from '@app/hooks';
import { MASS_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';
import { noop } from '@app/utils';

import { selectWeight } from '../state';
import AddWeight from './form/AddWeight';
import CardContent from './CardContent';

function WeightCard() {
  const globalT = useCommonTranslate();
  const navigate = useNavigate();

  const isConnected = useIsConnected();

  const [isModalOpen, setModalOpen] = useState(false);

  const unit = useAppSelector(selectMeasurementUnit);
  const { weight, goalWeight } = useAppSelector(selectWeight);

  const massUnit = MASS_UNITS[unit];

  useFetchLastWeightQuery();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function navigateWeightAnalytics() {
    navigate('/private/health-record/weight_analytics');
  }

  return (
    <Box>
      <Box bgColor="white" p={1} rounded={4}>
        <Pressable onPress={isConnected ? navigateWeightAnalytics : noop}>
          <CardContent
            title={globalT('user.weight')}
            date={weight.datetime}
            value={weight[massUnit]}
            unit={massUnit}
            goalValue={goalWeight[massUnit]}
            goalUnit={massUnit}
            onAdd={openModal}
          />
        </Pressable>
      </Box>
      {isModalOpen ? (
        <AddWeight onClose={closeModal} unit={unit} goalValue={goalWeight[massUnit]} />
      ) : null}
    </Box>
  );
}

export default WeightCard;
