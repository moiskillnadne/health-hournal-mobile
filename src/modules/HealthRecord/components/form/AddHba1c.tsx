import { useState, useEffect } from 'react';
import { Text, Button, Column } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';

import { AppModal } from '@app/components';
import { DatePickerField, SelectField } from '@app/components/form';
import { useAppForm, useFetchHba1cOptionsQuery, useCommonTranslate } from '@app/hooks';

import { useTranslate, useAddHba1cMutation } from '../../hooks';
import { HBA1C_UNIT } from '../../constants';
import { AddHba1cSchema } from '../../schemas';
import { AddHba1cForm } from '../../types';
import { HbA1c } from '../../utils';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddHba1c({ onClose, goalValue }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const isOnline = useIsConnected();

  const form = useAppForm<AddHba1cForm>(
    {
      defaultValues: {
        hba1c: {
          percent: undefined,
          date: new Date().toUTCString(),
          time: '',
        },
        goalHba1c: goalValue,
      },
    },
    { schema: AddHba1cSchema },
  );

  const { handleSubmit } = form;

  const [addHba1c, { isSuccess: isSuccessfullyAdded, isError, isLoading }] = useAddHba1cMutation();

  const { data: options } = useFetchHba1cOptionsQuery();

  function onAdd(data: AddHba1cForm) {
    const payload = HbA1c.toApiData(data);

    addHba1c(payload);
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
      <AppModal isOpen onClose={onClose} px={4} avoidKeyboard>
        <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
          <AppModal.CloseButton top={3.5} />

          <AppModal.Header borderBottomWidth={0} bgColor="white">
            <Text fontSize={18} fontWeight={600}>
              {t('titles.add_hba1c_level')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5}>
                <SelectField
                  label={`${t('form.hba1c')}, ${HBA1C_UNIT}*`}
                  name="hba1c.percent"
                  options={options}
                />

                <DatePickerField
                  label={`${globalT('form.date')}*`}
                  name="hba1c.date"
                  maximumDate={new Date()}
                  mode="date"
                />

                <DatePickerField label={`${globalT('form.time')}*`} name="hba1c.time" mode="time" />

                <SelectField
                  label={`${globalT('goal')}, ${HBA1C_UNIT}`}
                  name="goalHba1c"
                  options={options}
                />
              </Column>

              <Button mt={2.5} onPress={handleSubmit(onAdd)} isDisabled={isLoading}>
                {t('buttons.add')}
              </Button>
            </FormProvider>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>
    </>
  );
}

export default AddHba1c;
