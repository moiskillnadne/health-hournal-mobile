import { useMemo, useState } from 'react';
import { Box, Row, Button, Pressable, Column, Text, IconButton, CloseIcon } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';

import { Header, Content, H1, Progress, AddButton, Logo } from '@app/components';
import { RadioGroupField } from '@app/components/form';
import { useAppForm, useStepper, useAppSelector, useFetchAppointmentsQuery } from '@app/hooks';
import { formatDate, mergeDateAndTime } from '@app/utils';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { NextDoctorsAppointmentSchema } from '../../schemas';
import { NextDoctorsAppointmentForm, Appointment as TAppointment } from '../../types';
import { SettingsIcon } from '../icons';
import { selectNextDoctorsAppointment } from '../../state';
import { Appointment } from '../../entities';
import AddAppointment from './AddAppointment';

function NextDoctorsAppointment() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const { progress, onNext } = useStepper();

  const navigate = useNavigate();

  const defaultValues = useAppSelector(selectNextDoctorsAppointment);

  const { data: appointments } = useFetchAppointmentsQuery();

  const form = useAppForm<NextDoctorsAppointmentForm>(
    {
      defaultValues,
      mode: 'onChange',
      reValidateMode: 'onChange',
    },
    { schema: NextDoctorsAppointmentSchema },
  );

  const { handleSubmit, getValues, watch, setValue } = form;

  const [appointment, hasAppointment, appointmentAttached] = watch([
    'appointment',
    'hasAppointment',
    'appointmentAttached',
  ]) as [TAppointment, 'true' | 'false', boolean];

  const selectedAppointmentName = useMemo(() => {
    if (appointments && appointment) {
      const selectedAppointment = appointments.find(item => item.value === appointment?.id);

      if (selectedAppointment) {
        return selectedAppointment.label;
      }
    }
  }, [appointments, appointment]);

  function onSubmit() {
    onNext(getValues());
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function closeModal() {
    setModalOpen(false);
  }

  function addIconPress() {
    setModalOpen(true);
    setValue('hasAppointment', 'true');
    setValue('noScheduledAppointment', 'false');
    setValue('needToScheduleAppointment', 'false');
  }

  function add(data: TAppointment) {
    setValue('appointmentAttached', true);
    setValue('appointment', data);
    closeModal();
  }

  function remove() {
    setValue('appointmentAttached', false);
    setValue('appointment', Appointment());
  }

  usePersistOnChange(watch);

  return (
    <FormProvider {...form}>
      <Box flex={1}>
        <Header
          title={t('titles.health_assessment')}
          leftElement={<BackButton />}
          rightElement={
            <Pressable onPress={navigateUnits}>
              <SettingsIcon />
            </Pressable>
          }
        />

        <Progress value={progress} />

        <Content my={5} flex={1}>
          <H1>{t('questions.when_is_your_next_doctors_appointment')}</H1>

          <Column mt={10} space="5" flex={1}>
            <RadioGroupField
              name="hasAppointment"
              accessibilityLabel={t('questions.when_is_your_next_doctors_appointment')}
              options={[
                {
                  label: t('form.i_have_scheduled_for'),
                  value: 'true',
                  icon: !appointmentAttached ? <AddButton onPress={addIconPress} /> : undefined,
                },
              ]}
              onChange={() => {
                setValue('noScheduledAppointment', 'false');
                setValue('needToScheduleAppointment', 'false');
              }}
            />

            {appointmentAttached && hasAppointment === 'true' && appointment ? (
              <Box bgColor="white" borderRadius={4} borderWidth={1} borderColor="#e9e9e9" p={4}>
                <Row justifyContent="space-between" alignItems="flex-start">
                  <Text>{selectedAppointmentName}</Text>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    _icon={{
                      marginRight: -2,
                    }}
                    icon={<CloseIcon size="3" color="coolGray.600" />}
                    onPress={remove}
                  />
                </Row>
                <Text>{appointment.doctor}</Text>
                <Text>
                  {appointment.date &&
                    formatDate(
                      mergeDateAndTime(appointment.date, appointment.time),
                      'MMMM d, yyyy h:mm a',
                    )}
                </Text>
              </Box>
            ) : null}

            <RadioGroupField
              name="needToScheduleAppointment"
              accessibilityLabel={t('questions.when_is_your_next_doctors_appointment')}
              options={[{ label: t('form.i_need_call_doctor'), value: 'true' }]}
              onChange={() => {
                setValue('noScheduledAppointment', 'false');
                setValue('hasAppointment', 'false');
              }}
            />

            <RadioGroupField
              name="noScheduledAppointment"
              accessibilityLabel={t('questions.when_is_your_next_doctors_appointment')}
              options={[{ label: t('form.i_do_not_go_to_doctor'), value: 'true' }]}
              onChange={() => {
                setValue('needToScheduleAppointment', 'false');
                setValue('hasAppointment', 'false');
              }}
            />

            <Button
              mt={5}
              isDisabled={!appointmentAttached && hasAppointment === 'true'}
              onPress={handleSubmit(onSubmit)}
            >
              {t('buttons.next')}
            </Button>
          </Column>

          <Logo />
        </Content>
        {isModalOpen && <AddAppointment onClose={closeModal} onSubmitSuccess={add} />}
      </Box>
    </FormProvider>
  );
}

export default NextDoctorsAppointment;
