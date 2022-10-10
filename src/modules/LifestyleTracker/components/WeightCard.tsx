import { useState } from 'react';

import { useCommonTranslate, useAppSelector, useFetchLastWeightQuery } from '@app/hooks';
import { MASS_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';
import { AddWeight } from '@app/modules/HealthRecord/components/form';
import { selectWeight } from '@app/modules/HealthRecord';

import { useTranslate } from '../hooks';
import { WeightIcon } from '../components/icons';

import Card from './Card';

function WeightCard() {
  const globalT = useCommonTranslate();

  const t = useTranslate();

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

  return (
    <>
      <Card
        title={globalT('user.weight')}
        date={weight?.datetime}
        value={weight[massUnit]}
        unit={massUnit}
        goalValue={goalWeight[massUnit]}
        onAdd={openModal}
        description={t('tooltip.weight')}
        icon={<WeightIcon />}
      />
      {isModalOpen ? (
        <AddWeight onClose={closeModal} unit={unit} goalValue={goalWeight[massUnit]} />
      ) : null}
    </>
  );
}

export default WeightCard;
