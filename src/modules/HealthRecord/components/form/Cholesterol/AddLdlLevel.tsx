import { useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

import { useTranslate, useAddLdlMutation } from '../../../hooks';
import AddCholesterolForm from './AddCholesterolForm';
import { Cholesterol } from '../../../utils';
import { AddCholesterolForm as AddCholesterolFormType } from '../../../types';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddLdlLevel({ onClose, goalValue }: Props) {
  const t = useTranslate();

  const isOnline = useIsConnected();

  const [addLdl, { isSuccess: isSuccessfullyAdded, isError, isLoading }] = useAddLdlMutation();

  function add(data: AddCholesterolFormType) {
    const payload = Cholesterol.toLdlData(data);

    addLdl(payload);
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
        title={t('titles.add_ldl')}
        label={t('titles.ldl')}
        goalValue={goalValue}
        onClose={onClose}
        onSubmit={add}
        isLoading={isLoading}
        type="LDL"
      />
    </>
  );
}

export default AddLdlLevel;
