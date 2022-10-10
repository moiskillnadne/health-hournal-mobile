import { useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

import { useAppSelector } from '@app/hooks';

import { useTranslate, useAddAfterMealBloodSugarMutation } from '../../hooks';
import { selectAfterMealBloodSugar } from '../../state';

import AddBloodSugar from './AddBloodSugarForm';
import { BloodSugar } from '../../utils';
import { AddBloodSugarForm as AddBloodSugarFormType } from '../../types';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddAfterMealBloodSugar({ onClose }: Props) {
  const t = useTranslate();

  const isOnline = useIsConnected();

  const [addBloodSugar, { isSuccess: isSuccessfullyAdded, isError, isLoading }] =
    useAddAfterMealBloodSugarMutation();

  const afterMealBloodSugar = useAppSelector(selectAfterMealBloodSugar);

  function add(data: AddBloodSugarFormType) {
    const payload = BloodSugar.toAfterMealData(data);

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
        title={t('titles.add_after_meal_blood_sugar')}
        label={t('titles.after_meal_blood_sugar')}
        onClose={onClose}
        value={afterMealBloodSugar}
        onSubmit={add}
        isLoading={isLoading}
      />
    </>
  );
}

export default AddAfterMealBloodSugar;
