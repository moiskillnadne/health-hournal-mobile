import { useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

import { useAppSelector } from '@app/hooks';

import { useTranslate, useAddFastingBloodSugarMutation } from '../../hooks';
import { selectFastingBloodSugar } from '../../state';

import AddBloodSugar from './AddBloodSugarForm';
import { BloodSugar } from '../../utils';
import { AddBloodSugarForm as AddBloodSugarFormType } from '../../types';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddFastingBloodSugar({ onClose }: Props) {
  const t = useTranslate();

  const isOnline = useIsConnected();

  const [addBloodSugar, { isSuccess: isSuccessfullyAdded, isError, isLoading }] =
    useAddFastingBloodSugarMutation();

  const fastingBloodSugar = useAppSelector(selectFastingBloodSugar);

  function add(data: AddBloodSugarFormType) {
    const payload = BloodSugar.toFastingData(data);

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
      <AddBloodSugar
        title={t('titles.add_fasting_blood_sugar')}
        label={t('titles.fasting_blood_sugar')}
        value={fastingBloodSugar}
        onClose={onClose}
        onSubmit={add}
        isLoading={isLoading}
      />
    </>
  );
}

export default AddFastingBloodSugar;
