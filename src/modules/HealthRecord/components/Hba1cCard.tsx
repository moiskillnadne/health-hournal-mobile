import { useState } from 'react';
import { Box, Pressable } from 'native-base';
import { useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { noop } from '@app/utils';
import { useAppSelector } from '@app/hooks';

import { useFetchLastHba1cQuery, useTranslate } from '../hooks';
import { selectHba1c } from '../state';
import { HBA1C_UNIT } from '../constants';
import { AddHba1c } from './form';
import CardContent from './CardContent';

function Hba1cCard() {
  const t = useTranslate();
  const navigate = useNavigate();

  const isConnected = useIsConnected();

  const [isModalOpen, setModalOpen] = useState(false);

  const { hba1c, goalHba1c } = useAppSelector(selectHba1c);

  useFetchLastHba1cQuery();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function navigateHbac1Analytics() {
    navigate('/private/health-record/hba1c_analytics');
  }

  return (
    <Box bgColor="white" rounded={4} p={1}>
      <Pressable onPress={isConnected ? navigateHbac1Analytics : noop}>
        <CardContent
          title={t('titles.hba1c_level')}
          date={hba1c.datetime}
          value={hba1c.percent || null}
          unit={HBA1C_UNIT}
          goalValue={goalHba1c || null}
          goalUnit={HBA1C_UNIT}
          onAdd={openModal}
        />
      </Pressable>

      {isModalOpen ? <AddHba1c onClose={closeModal} goalValue={goalHba1c} /> : null}
    </Box>
  );
}

export default Hba1cCard;
