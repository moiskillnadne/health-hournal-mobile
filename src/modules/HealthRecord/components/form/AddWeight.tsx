import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Text, Button, Column, KeyboardAvoidingView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';

import { AppModal } from '@app/components';
import { DatePickerField, InputField } from '@app/components/form';
import { useAppForm, useCommonTranslate } from '@app/hooks';

import { MASS_UNITS } from '@app/constants';

import { useTranslate, useAddWeightMutation } from '../../hooks';
import { AddWeightSchema } from '../../schemas';
import { AddWeightForm } from '../../types';
import { Weight as WeightUtils } from '../../utils';

type Props = {
  onClose: () => void;
  unit: string;
  goalValue?: number;
};

function AddWeight({ onClose, unit, goalValue }: Props) {
  const t = useTranslate();

  const globalT = useCommonTranslate();

  const massUnit = MASS_UNITS[unit as keyof typeof MASS_UNITS];

  const isOnline = useIsConnected();

  const form = useAppForm<AddWeightForm>(
    {
      defaultValues: {
        weight: {
          [massUnit]: '',
          date: new Date().toUTCString(),
          time: '',
        },
        ...(goalValue && { goalWeight: { [massUnit]: String((goalValue * 10) / 10) } }),
      } as AddWeightForm,
    },
    { schema: AddWeightSchema, context: { unit, format: 'XXX.X' } },
  );

  const { handleSubmit } = form;

  const [addWeight, { isSuccess: isSuccessfullyAdded, isError, isLoading }] =
    useAddWeightMutation();

  function onAdd(data: AddWeightForm) {
    const payload = WeightUtils.toAddData(data);

    addWeight(payload);
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
      <AppModal isOpen onClose={onClose} px={4}>
        <KeyboardAvoidingView
          flex={1}
          justifyContent="center"
          w="full"
          behavior="padding"
          enabled={Platform.OS === 'ios'}
        >
          <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
            <AppModal.CloseButton top={3.5} />

            <AppModal.Header borderBottomWidth={0} bgColor="white">
              <Text fontSize={18} fontWeight={600}>
                {t('titles.add_weight')}
              </Text>
            </AppModal.Header>

            <AppModal.Body>
              <FormProvider {...form}>
                <Column space={2.5}>
                  <InputField
                    label={`${globalT('user.weight')}, ${massUnit}*`}
                    keyboardType="numeric"
                    name={`weight.${massUnit}`}
                    maxLength={5}
                  />

                  <DatePickerField
                    label={`${globalT('form.date')}*`}
                    name="weight.date"
                    maximumDate={new Date()}
                    mode="date"
                  />

                  <DatePickerField
                    label={`${globalT('form.time')}*`}
                    name="weight.time"
                    mode="time"
                  />

                  <InputField
                    label={`${globalT('goal')}, ${massUnit}`}
                    keyboardType="numeric"
                    name={`goalWeight.${massUnit}`}
                    maxLength={5}
                  />
                </Column>

                <Button mt={2.5} onPress={handleSubmit(onAdd)} isDisabled={isLoading}>
                  {t('buttons.add')}
                </Button>
              </FormProvider>
            </AppModal.Body>
          </AppModal.Content>
        </KeyboardAvoidingView>
      </AppModal>
    </>
  );
}

export default AddWeight;
