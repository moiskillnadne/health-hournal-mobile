import { useState, useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

import { useAppSelector } from '@app/hooks';

import { useTranslate, useAddRandomBloodSugarMutation } from '../../hooks';
import { selectRandomBloodSugar } from '../../state';

import AddBloodSugarForm from './AddBloodSugarForm';
import { BloodSugar } from '../../utils';
import { AddBloodSugarForm as AddBloodSugarFormType } from '../../types';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddRandomBloodSugar({ onClose }: Props) {
  const t = useTranslate();

  const isOnline = useIsConnected();

  const [addBloodSugar, { isSuccess: isSuccessfullyAdded, isError, isLoading }] =
    useAddRandomBloodSugarMutation();

  const randomBloodSugar = useAppSelector(selectRandomBloodSugar);

  function add(data: AddBloodSugarFormType) {
    const payload = BloodSugar.toRandomData(data);

    addBloodSugar(payload);
  }

  useEffect(() => {
    if (isError && !isOnline) {
      onClose();
    }
  }, [isError, isOnline, onClose]);

  useEffect(() => {
    if (isSuccessfullyAdded) {
      onClose();
    }
  }, [isSuccessfullyAdded, onClose]);

  return (
    <>
      <AddBloodSugarForm
        title={t('titles.add_random_blood_sugar')}
        label={t('titles.random_blood_sugar')}
        value={randomBloodSugar}
        onClose={onClose}
        onSubmit={add}
        isLoading={isLoading}
      />
    </>
  );
}

export default AddRandomBloodSugar;
