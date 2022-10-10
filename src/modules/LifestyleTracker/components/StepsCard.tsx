import { useState } from 'react';

import { useAppSelector } from '@app/hooks';

import { useTranslate, useFetchLastStepsQuery } from '../hooks';
import { selectSteps } from '../state';
import { StepsIcon } from '../components/icons';
import { AddSteps } from '../components/form';

import Card from './Card';

function StepsCard() {
  const t = useTranslate();

  const { steps, goalSteps, datetime } = useAppSelector(selectSteps);

  const [isModalOpen, setModalOpen] = useState(false);

  useFetchLastStepsQuery();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Card
        title={t('titles.steps')}
        date={datetime}
        value={steps?.toLocaleString('en-US')}
        unit={t('titles.steps').toLowerCase()}
        goalValue={goalSteps?.toLocaleString('en-US')}
        onAdd={openModal}
        description={t('tooltip.steps')}
        icon={<StepsIcon />}
      />
      {isModalOpen ? <AddSteps onClose={closeModal} goalValue={goalSteps} /> : null}
    </>
  );
}

export default StepsCard;
