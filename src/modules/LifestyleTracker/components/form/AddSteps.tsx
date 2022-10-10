import { useEffect } from 'react';
import { Text, Button, Column } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';

import { AppModal } from '@app/components';
import { DatePickerField, InputMaskField } from '@app/components/form';

import { useAppForm, useCommonTranslate } from '@app/hooks';

import { useTranslate, useAddStepsMutation } from '../../hooks';
import { AddStepsSchema } from '../../schemas';
import { AddStepsForm } from '../../types';
import { Steps } from '../../utils';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

const STEPS_INPUT_OPTIONS = {
  precision: 0,
  separator: '',
  delimiter: ',',
  unit: '',
};

function AddSteps({ onClose, goalValue }: Props) {
  const t = useTranslate();

  const globalT = useCommonTranslate();

  const isOnline = useIsConnected();

  const form = useAppForm<AddStepsForm>(
    {
      defaultValues: {
        steps: '',
        goalSteps: goalValue?.toString(),
        date: new Date().toUTCString(),
        time: '',
      },
    },
    { schema: AddStepsSchema },
  );

  const { handleSubmit } = form;

  const [addSteps, { isSuccess: isSuccessfullyAdded, isError, isLoading }] = useAddStepsMutation();

  function onAdd(data: AddStepsForm) {
    const payload = Steps.toAddData(data);
    addSteps(payload);
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
              {t('titles.add_steps')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5}>
                <InputMaskField
                  label={`${t('titles.steps')}*`}
                  keyboardType="numeric"
                  name="steps"
                  maxLength={6}
                  maskType="money"
                  options={STEPS_INPUT_OPTIONS}
                />

                <DatePickerField
                  label={`${globalT('form.date')}*`}
                  name="date"
                  maximumDate={new Date()}
                  mode="date"
                />

                <DatePickerField label={`${globalT('form.time')}*`} name="time" mode="time" />

                <InputMaskField
                  label={globalT('goal')}
                  keyboardType="numeric"
                  name="goalSteps"
                  maxLength={6}
                  maskType="money"
                  options={STEPS_INPUT_OPTIONS}
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

export default AddSteps;
