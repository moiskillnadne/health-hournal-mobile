import { useEffect, useMemo } from 'react';
import { Text, Button, Column, Pressable } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { ErrorAlert, AppModal } from '@app/components';
import { DatePickerField, SelectField, InputField } from '@app/components/form';
import {
  useAppForm,
  useAppSelector,
  useCommonTranslate,
  useFetchAppointmentsQuery,
} from '@app/hooks';

import {
  useTranslate,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useFetchAppointmentEntityQuery,
} from '../../hooks';
import { AppointmentEditorSchema } from '../../schemas';
import { AppointmentEditorForm } from '../../types';
import { selectAppointment } from '../../state';
import { mergeDateAndTime } from '@app/utils';

type Props = {
  id?: string;
  onClose: () => void;
};

function AppointmentEditor({ onClose, id }: Props) {
  const t = useTranslate();

  const globalT = useCommonTranslate();

  const defaultValues = useAppSelector(selectAppointment);

  const { data: entity } = useFetchAppointmentEntityQuery(id, { refetchOnMountOrArgChange: true });

  const form = useAppForm<AppointmentEditorForm>(
    {
      defaultValues,
    },
    { schema: AppointmentEditorSchema },
  );

  const { data: appointments } = useFetchAppointmentsQuery();

  const { handleSubmit, watch, reset } = form;

  const [appointmentId] = watch(['appointmentId']);

  const lastAppointmentValue = useMemo(() => {
    if (appointments?.length) {
      return appointments[appointments.length - 1].value;
    }

    return '';
  }, [appointments]);

  const [addAppointment, { isSuccess: isSuccessfullyAdded, error: errorAdding }] =
    useAddAppointmentMutation();

  const [updateAppointment, { isSuccess: isSuccessfullyUpdated, error: errorUpdating }] =
    useUpdateAppointmentMutation();

  function submit(data: AppointmentEditorForm) {
    const { appointmentId, speciality, doctor, date, time } = data;
    const payload = {
      speciality: speciality || null,
      doctor: doctor || null,
      datetime: mergeDateAndTime(date, time),
    };
    if (entity && id) {
      updateAppointment({
        id,
        appointmentId,
        ...payload,
      });
    } else {
      addAppointment([{ id: appointmentId, ...payload }]);
    }
  }

  useEffect(() => {
    if (entity) {
      reset({
        ...entity,
        date: entity.datetime,
        time: entity.datetime,
      });
    }
  }, [entity, reset, defaultValues]);

  useEffect(() => {
    if (isSuccessfullyAdded || isSuccessfullyUpdated) {
      onClose();
    }
  }, [isSuccessfullyAdded, isSuccessfullyUpdated, onClose]);

  return (
    <>
      <AppModal isOpen onClose={onClose} px={4} avoidKeyboard>
        <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full" py={1}>
          <AppModal.CloseButton top={3.5} />

          <AppModal.Header borderBottomWidth={0} bgColor="white">
            <Text fontSize={18} fontWeight={600}>
              {entity ? t('titles.edit_appointment') : t('titles.add_appointment')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column w={'100%'} space={2.5}>
                <SelectField
                  label={t('form.appointment')}
                  name="appointmentId"
                  options={appointments}
                />

                {appointmentId === lastAppointmentValue && (
                  <InputField label={t('form.specialty')} name="speciality" />
                )}

                <InputField label={t('form.doctors_name')} name="doctor" />

                <DatePickerField label={globalT('form.date')} name="date" mode="date" />

                <DatePickerField label={globalT('form.time')} name="time" mode="time" />
              </Column>
            </FormProvider>

            <Button mt={3} w="100%" onPress={handleSubmit(submit)}>
              {entity ? t('buttons.save') : t('buttons.add')}
            </Button>

            <Pressable mt={5} w="100%" onPress={onClose} hitSlop={5}>
              <Text textAlign="center" color="primary.500" fontWeight={600}>
                {globalT('cancel')}
              </Text>
            </Pressable>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>

      {errorAdding && <ErrorAlert error={errorAdding}></ErrorAlert>}

      {errorUpdating && <ErrorAlert error={errorUpdating}></ErrorAlert>}
    </>
  );
}

export default AppointmentEditor;
