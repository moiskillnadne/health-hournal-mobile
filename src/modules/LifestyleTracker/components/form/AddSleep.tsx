import { useEffect } from 'react';
import { Text, Button, Column } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';

import { AppModal } from '@app/components';
import { DatePickerField, InputField } from '@app/components/form';

import { useAppForm, useCommonTranslate } from '@app/hooks';

import { useTranslate, useAddSleepMutation } from '../../hooks';
import { AddSleepSchema } from '../../schemas';
import { AddSleepForm } from '../../types';
import { Sleep } from '../../utils';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

function AddSleep({ onClose, goalValue }: Props) {
  const t = useTranslate();

  const globalT = useCommonTranslate();

  const isOnline = useIsConnected();

  const form = useAppForm<AddSleepForm>(
    {
      defaultValues: {
        sleepHours: '',
        sleepGoal: goalValue?.toString(),
        date: new Date().toUTCString(),
        time: '',
      },
    },
    { schema: AddSleepSchema },
  );

  const { handleSubmit } = form;

  const [addSleep, { isSuccess: isSuccessfullyAdded, isError, isLoading }] = useAddSleepMutation();

  function onAdd(data: AddSleepForm) {
    const payload = Sleep.toAddData(data);

    addSleep(payload);
  }

  useEffect(() => {
    if (!isOnline && isError) {
      onClose();
    }
  }, [isOnline, isError, onClose]);

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
              {t('titles.add_sleep_hours')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5}>
                <InputField
                  label={`${t('form.sleep_hours')}*`}
                  keyboardType="numeric"
                  name="sleepHours"
                  maxLength={4}
                />

                <DatePickerField
                  label={`${globalT('form.date')}*`}
                  name="date"
                  maximumDate={new Date()}
                  mode="date"
                />

                <DatePickerField label={`${globalT('form.time')}*`} name="time" mode="time" />

                <InputField
                  label={`${globalT('goal')}, ${t('form.hours')}`}
                  keyboardType="numeric"
                  name="sleepGoal"
                  maxLength={4}
                />

                <Button mt={2.5} onPress={handleSubmit(onAdd)} isDisabled={isLoading}>
                  {globalT('add')}
                </Button>
              </Column>
            </FormProvider>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>
    </>
  );
}

export default AddSleep;
