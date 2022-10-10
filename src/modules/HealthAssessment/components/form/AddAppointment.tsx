import { useMemo } from 'react';
import { Button, Column, Modal, Text } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { InputField, SelectField, DatePickerField } from '@app/components/form';
import {
  useAppForm,
  useAppSelector,
  useFetchAppointmentsQuery,
  useCommonTranslate,
} from '@app/hooks';

import { useTranslate } from '../../hooks';
import { AppointmentRequiredSchema } from '../../schemas';
import { AppointmentForm, Appointment as TAppointment } from '../../types';
import { selectAppointment } from '../../state';

type Props = {
  onClose: () => void;
  onSubmitSuccess: (data: TAppointment) => void;
};

function AddAppointment({ onClose, onSubmitSuccess }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const defaultValues = useAppSelector(selectAppointment);

  const { data: appointments } = useFetchAppointmentsQuery();

  const form = useAppForm<AppointmentForm>(
    {
      defaultValues,
    },
    { schema: AppointmentRequiredSchema },
  );

  const { handleSubmit, getValues, watch } = form;

  const [id] = watch(['id']);

  const lastAppointmentValue = useMemo(() => {
    if (appointments?.length) {
      return appointments[appointments.length - 1].value;
    }

    return '';
  }, [appointments]);

  function onSubmit() {
    onSubmitSuccess(getValues());
  }

  return (
    <Modal isOpen onClose={onClose} px={4} avoidKeyboard>
      <Modal.Content bg="white" borderRadius={4} maxW="full" w="full">
        <Modal.CloseButton top={3.5} />

        <Modal.Header borderBottomWidth={0} bgColor="white">
          <Text fontSize={18} fontWeight={600}>
            {t('titles.add_an_appointment')}
          </Text>
        </Modal.Header>

        <Modal.Body>
          <FormProvider {...form}>
            <Column space={2.5}>
              <SelectField label={t('form.appointment')} name="id" options={appointments} />

              {id === lastAppointmentValue && (
                <InputField label={t('form.specialty')} name="speciality" />
              )}

              <InputField label={t('form.doctors_name')} name="doctor" />

              <DatePickerField
                label={globalT('form.date')}
                name="date"
                mode="date"
                minimumDate={new Date()}
              />

              <DatePickerField label={globalT('form.time')} name="time" mode="time" />

              <Button onPress={handleSubmit(onSubmit)}>{t('buttons.add')}</Button>
            </Column>
          </FormProvider>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default AddAppointment;
