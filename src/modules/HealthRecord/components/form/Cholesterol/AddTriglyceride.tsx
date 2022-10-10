import { useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

import { useTranslate, useAddTriglycerideMutation } from '../../../hooks';
import AddCholesterolForm from './AddCholesterolForm';
import { Cholesterol } from '../../../utils';
import { AddCholesterolForm as AddCholesterolFormType } from '../../../types';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddTriglyceride({ onClose, goalValue }: Props) {
  const t = useTranslate();

  const isOnline = useIsConnected();

  const [addTriglyceride, { isSuccess: isSuccessfullyAdded, isError, isLoading }] =
    useAddTriglycerideMutation();

  function add(data: AddCholesterolFormType) {
    const payload = Cholesterol.toTriglycerideData(data);

    addTriglyceride(payload);
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
      <AddCholesterolForm
        title={t('titles.add_triglycerides')}
        label={t('titles.triglycerides')}
        goalValue={goalValue}
        onClose={onClose}
        onSubmit={add}
        isLoading={isLoading}
        type="Triglyceride"
      />
    </>
  );
}

export default AddTriglyceride;
