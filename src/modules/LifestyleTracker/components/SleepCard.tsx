import { useState } from 'react';

import { useAppSelector } from '@app/hooks';

import { useTranslate, useFetchLastSleepQuery } from '../hooks';
import { SleepIcon } from '../components/icons';
import { AddSleep } from '../components/form';
import { selectSleep } from '../state';

import Card from './Card';

function SleepCard() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const { sleepHours, sleepGoal, datetime } = useAppSelector(selectSleep);

  useFetchLastSleepQuery();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Card
        title={t('titles.sleep')}
        date={datetime}
        value={sleepHours}
        unit={t('form.hours')}
        goalValue={sleepGoal}
        onAdd={openModal}
        description={t('tooltip.sleep')}
        icon={<SleepIcon />}
      />
      {isModalOpen ? <AddSleep onClose={closeModal} goalValue={sleepGoal} /> : null}
    </>
  );
}

export default SleepCard;
