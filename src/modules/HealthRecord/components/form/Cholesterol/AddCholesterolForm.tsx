import { Platform } from 'react-native';
import { Text, Button, Column, KeyboardAvoidingView } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { AppModal } from '@app/components';
import { InputField, DatePickerField } from '@app/components/form';
import { useAppForm, useAppSelector, useCommonTranslate } from '@app/hooks';
import { CHOLESTEROL_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';

import { useTranslate } from '../../../hooks';
import { AddCholesterolSchema } from '../../../schemas';
import { AddCholesterolForm } from '../../../types';
import { CHOLESTEROL_UNITS_FORM } from '../../../constants';

type Props = {
  title: string;
  label: string;
  goalValue?: number;
  onSubmit: (value: AddCholesterolForm) => void;
  onClose: () => void;
  isLoading: boolean;
  type: 'LDL' | 'Triglyceride';
};

function AddCholesterol({ type, onClose, goalValue, onSubmit, title, label, isLoading }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const unit = useAppSelector(selectMeasurementUnit);

  const cholesterolUnit = CHOLESTEROL_UNITS[unit];

  const unitForm = CHOLESTEROL_UNITS_FORM[unit];

  const valuesMaxLength = unit === 'Metric' ? 5 : type === 'LDL' ? 3 : 4;

  const form = useAppForm<AddCholesterolForm>(
    {
      defaultValues: {
        cholesterol: {
          [unitForm]: '',
          date: new Date().toUTCString(),
          time: '',
        },
        goalCholesterol: {
          [unitForm]: goalValue?.toString(),
        },
      },
    },
    {
      schema: AddCholesterolSchema,
      context: {
        unit,
        type,
        format: unit === 'Metric' ? 'XX.XX' : type === 'LDL' ? 'XXX' : 'XXXX',
      },
    },
  );

  const { handleSubmit } = form;

  function onAdd(data: AddCholesterolForm) {
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
                  label={`${label}, ${cholesterolUnit}*`}
                  keyboardType="numeric"
                  name={`cholesterol.${unitForm}`}
                  maxLength={valuesMaxLength}
                />

                <DatePickerField
                  label={`${globalT('form.date')}*`}
                  name="cholesterol.date"
                  maximumDate={new Date()}
                  mode="date"
                />

                <DatePickerField
                  label={`${globalT('form.time')}*`}
                  name="cholesterol.time"
                  mode="time"
                />

                <InputField
                  label={`${globalT('goal')}, ${cholesterolUnit}`}
                  keyboardType="numeric"
                  name={`goalCholesterol.${unitForm}`}
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

export default AddCholesterol;
