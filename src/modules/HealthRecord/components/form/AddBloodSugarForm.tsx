import { Platform } from 'react-native';
import { Text, Button, Column, KeyboardAvoidingView } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { AppModal } from '@app/components';
import { InputField, DatePickerField } from '@app/components/form';
import { useAppForm, useAppSelector, useCommonTranslate } from '@app/hooks';
import { BLOOD_SUGAR_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';

import { useTranslate } from '../../hooks';
import { AddBloodSugarSchema } from '../../schemas';
import { AddBloodSugarForm } from '../../types';
import { UserBloodSugar } from '../../state';
import { BLOOD_PRESSURE_UNITS_FORM } from '../../constants';

type Props = {
  title: string;
  label: string;
  value: UserBloodSugar;
  onSubmit: (value: AddBloodSugarForm) => void;
  onClose: () => void;
  isLoading: boolean;
};

function AddBloodSugar({ onClose, value, onSubmit, title, label, isLoading }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const unit = useAppSelector(selectMeasurementUnit);

  const bloodSugarUnit = BLOOD_SUGAR_UNITS[unit];

  const unitForm = BLOOD_PRESSURE_UNITS_FORM[unit];

  const valuesMaxLength = unit === 'Metric' ? 5 : 3;

  const form = useAppForm<AddBloodSugarForm>(
    {
      defaultValues: {
        bloodSugar: {
          [unitForm]: '',
          date: new Date().toUTCString(),
          time: '',
        },
        goalBloodSugar: {
          [unitForm]: value.goalBloodSugar[unitForm]?.toString(),
        },
      },
    },
    { schema: AddBloodSugarSchema, context: { unit, format: unit === 'Metric' ? 'XX.XX' : 'XXX' } },
  );

  const { handleSubmit } = form;

  function onAdd(data: AddBloodSugarForm) {
    onSubmit(data);
  }

  return (
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
              {title}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5}>
                <InputField
                  label={`${label}, ${bloodSugarUnit}*`}
                  keyboardType="numeric"
                  name={`bloodSugar.${unitForm}`}
                  maxLength={valuesMaxLength}
                />

                <DatePickerField
                  label={`${globalT('form.date')}*`}
                  name="bloodSugar.date"
                  maximumDate={new Date()}
                  mode="date"
                />

                <DatePickerField
                  label={`${globalT('form.time')}*`}
                  name="bloodSugar.time"
                  mode="time"
                />

                <InputField
                  label={`${globalT('goal')}, ${bloodSugarUnit}`}
                  keyboardType="numeric"
                  name={`goalBloodSugar.${unitForm}`}
                  maxLength={valuesMaxLength}
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
  );
}

export default AddBloodSugar;
