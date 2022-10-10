import { useEffect } from 'react';
import { Text, Button, Column, KeyboardAvoidingView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';

import { H1, AppModal } from '@app/components';
import { InputMaskField, DatePickerField } from '@app/components/form';
import { useAppForm, useCommonTranslate } from '@app/hooks';
import { BLOOD_PRESSURE_UNIT } from '@app/constants';

import { useTranslate, useAddBloodPressureMutation } from '../../hooks';
import { AddBloodPressureSchema } from '../../schemas';
import { AddBloodPressureForm } from '../../types';
import { BloodPressure } from '../../utils';

type Props = {
  onClose: () => void;
  goalSystolic?: number;
  goalDiastolic?: number;
};

function AddBloodPressure({ onClose, goalSystolic, goalDiastolic }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const isOnline = useIsConnected();

  const form = useAppForm<AddBloodPressureForm>(
    {
      defaultValues: {
        date: new Date().toUTCString(),
        time: '',
        systolic: '',
        diastolic: '',
        goalPressureSystolic: goalSystolic?.toString(),
        goalPressureDiastolic: goalDiastolic?.toString(),
      },
    },
    { schema: AddBloodPressureSchema },
  );

  const { handleSubmit } = form;

  const [addBloodPressure, { isSuccess: isSuccessfullyAdded, isError, isLoading }] =
    useAddBloodPressureMutation();

  function onAdd(data: AddBloodPressureForm) {
    const payload = BloodPressure.toAddData(data);

    addBloodPressure(payload);
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
        <KeyboardAvoidingView flex={1} justifyContent="center" w="full" behavior="padding">
          <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
            <AppModal.CloseButton top={3.5} />

            <AppModal.Header borderBottomWidth={0} bgColor="white">
              <Text fontSize={18} fontWeight={600}>
                {t('titles.add_blood_pressure')}
              </Text>
            </AppModal.Header>

            <AppModal.Body>
              <FormProvider {...form}>
                <Column space={2.5}>
                  <InputMaskField
                    label={`${t('form.systolic')}, ${BLOOD_PRESSURE_UNIT}*`}
                    keyboardType="numeric"
                    name="systolic"
                    options={{
                      mask: '999',
                    }}
                  />

                  <InputMaskField
                    flex={1}
                    label={`${t('form.diastolic')}, ${BLOOD_PRESSURE_UNIT}*`}
                    keyboardType="numeric"
                    name="diastolic"
                    options={{
                      mask: '999',
                    }}
                  />

                  <DatePickerField
                    label={`${globalT('form.date')}*`}
                    name="date"
                    maximumDate={new Date()}
                    mode="date"
                  />

                  <DatePickerField label={`${globalT('form.time')}*`} name="time" mode="time" />

                  <H1 color="black">{globalT('goal')}:</H1>

                  <InputMaskField
                    flex={1}
                    label={`${t('form.systolic')}, ${BLOOD_PRESSURE_UNIT}`}
                    keyboardType="numeric"
                    name="goalPressureSystolic"
                    options={{
                      mask: '999',
                    }}
                  />

                  <InputMaskField
                    flex={1}
                    label={`${t('form.diastolic')}, ${BLOOD_PRESSURE_UNIT}`}
                    keyboardType="numeric"
                    name="goalPressureDiastolic"
                    options={{
                      mask: '999',
                    }}
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

export default AddBloodPressure;
