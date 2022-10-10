import { useState, useEffect } from 'react';
import { Column, ScrollView, Row, Spinner, Text, Pressable } from 'native-base';

import { Content, Logo, H1 } from '@app/components';
import { useFetchEventsQuery, useLocationState } from '@app/hooks';
import { Event as TEvent } from '@app/types';

import { useTranslate } from '../hooks';
import { Event } from '../components';
import { AppointmentEditor, ProcedureEditor } from '../components/form';

function Events() {
  const t = useTranslate();

  const [isProcedureOpen, setProcedureOpen] = useState(false);
  const [isAppointmentOpen, setAppointmentOpen] = useState(false);

  const [locationState, clearLocationState] = useLocationState<{
    shouldAddAppointment: boolean;
    shouldAddProcedure: boolean;
    shouldUpdateProcedure: boolean;
    procedureId: string;
    appointmentId: string;
    preselectedProcedureId: string;
  }>();

  const [event, setEvent] = useState<Maybe<TEvent>>(null);

  const { data: events, isLoading, isSuccess } = useFetchEventsQuery();

  function openProcedureModal() {
    setProcedureOpen(true);
  }

  function closeProcedureModal() {
    setProcedureOpen(false);
    setEvent(null);
    clearLocationState();
  }

  function openAppointmentModal() {
    setAppointmentOpen(true);
  }

  function closeAppointmentModal() {
    setAppointmentOpen(false);
    setEvent(null);
    clearLocationState();
  }

  function edit(item: TEvent) {
    if (item.procedureId) {
      openProcedureModal();
    } else {
      openAppointmentModal();
    }
    setEvent(item);
  }

  useEffect(() => {
    if (locationState?.shouldAddAppointment) {
      openAppointmentModal();
    }
  }, [locationState]);

  useEffect(() => {
    if (locationState?.shouldAddProcedure || locationState?.shouldUpdateProcedure) {
      openProcedureModal();
    }
  }, [locationState]);

  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
      <Content mt={5} flexGrow={1} justifyContent={'space-between'}>
        <Column space={4} flex={1}>
          <Row justifyContent={'space-between'} space={2.5}>
            <Pressable
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              flex={1}
              py={3}
              rounded={4}
              onPress={openAppointmentModal}
            >
              <Text textAlign="center" fontWeight={600}>
                {t('buttons.add_appointment')}
              </Text>
            </Pressable>

            <Pressable
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              flex={1}
              py={3}
              rounded={4}
              onPress={openProcedureModal}
            >
              <Text fontWeight={600}>{t('buttons.add_procedure')}</Text>
            </Pressable>
          </Row>

          <Column space={2.5}>
            <H1>{t('status.upcoming')}</H1>

            {isLoading && <Spinner size="lg" color="white" mb={4} />}

            {events?.current?.map((item: TEvent) => (
              <Event
                key={item?.appointmentId || item?.procedureId}
                event={item}
                onEdit={() => edit(item)}
              />
            ))}
          </Column>

          <Column space={2.5}>
            <H1>{t('status.previous')}</H1>

            {isLoading && <Spinner size="lg" color="white" mb={4} />}

            {events?.resolved?.map(event => (
              <Event key={event?.appointmentId || event?.procedureId} event={event} />
            ))}
          </Column>
        </Column>

        {isProcedureOpen ? (
          <ProcedureEditor
            id={event?.procedureId || locationState?.procedureId}
            onClose={closeProcedureModal}
            preselectedProcedureId={locationState?.preselectedProcedureId}
          />
        ) : null}

        {isAppointmentOpen ? (
          <AppointmentEditor
            id={event?.appointmentId || locationState?.appointmentId}
            onClose={closeAppointmentModal}
          />
        ) : null}

        <Logo />
      </Content>
    </ScrollView>
  );
}

export default Events;
