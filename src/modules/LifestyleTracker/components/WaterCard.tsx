import { useState, useEffect } from 'react';

import { useAppSelector, useLocationState } from '@app/hooks';
import { WATER_UNITS, WATER_UNITS_LABELS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';

import { useTranslate, useFetchLastWaterQuery, useWaterDrop } from '../hooks';
import { WaterIcon } from '../components/icons';
import { AddWater } from '../components/form';
import { selectWater } from '../state';

import Card from './Card';

function WaterCard() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const [locationState, clearLocationState] = useLocationState<{ shouldAddWater: boolean }>();

  const unit = useAppSelector(selectMeasurementUnit);
  const { water, goalWater } = useAppSelector(selectWater);

  const waterUnit = WATER_UNITS[unit];

  const waterUnitLabel = WATER_UNITS_LABELS[unit];

  useFetchLastWaterQuery();

  const value = water[waterUnit] ? Math.round(water[waterUnit] as number) : null;

  const goalValue = goalWater[waterUnit] ? Math.round(goalWater[waterUnit] as number) : null;

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    if (locationState?.shouldAddWater) {
      openModal();
      clearLocationState();
    }
  }, [clearLocationState, locationState]);

  useWaterDrop();

  return (
    <>
      <Card
        title={t('titles.water')}
        date={new Date().toString()}
        value={value}
        unit={waterUnitLabel}
        goalValue={goalValue}
        onAdd={openModal}
        description={t('tooltip.water')}
        icon={<WaterIcon />}
      />
      {isModalOpen ? <AddWater onClose={closeModal} goalValue={goalWater[waterUnit]} /> : null}
    </>
  );
}

export default WaterCard;
