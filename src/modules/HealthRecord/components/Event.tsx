import { Box, Row, Text, Pressable, Column } from 'native-base';

import { ErrorAlert } from '@app/components';
import { PencilIcon, DeleteIcon } from '@app/components/icons';
import { formatDate } from '@app/utils';
import { Event as TEvent } from '@app/types';

import { useRemoveProcedureMutation, useRemoveAppointmentMutation } from '../hooks';

type Props = {
  event: TEvent;
  onEdit?: () => void;
};

function Event({ event, onEdit }: Props) {
  const [removeProcedure, { error: errorProcedure }] = useRemoveProcedureMutation();

  const [removeAppointment, { error: errorAppointment }] = useRemoveAppointmentMutation();

  function remove() {
    if (event.procedureId) {
      return removeProcedure(event.procedureId);
    }
    if (event.appointmentId) {
      return removeAppointment(event.appointmentId);
    }
  }

  return (
    <Box bgColor="white" rounded={4} py={3} px={4}>
      <Column space={1}>
        <Row justifyContent={'space-between'}>
          <Text fontWeight={600} maxWidth={'85%'}>
            {event.otherEventName ? event.otherEventName : event.name}
          </Text>

          <Row>
            {onEdit && (
              <Pressable onPress={onEdit} mr={4} hitSlop={9}>
                <PencilIcon fill="#DEE0E6" />
              </Pressable>
            )}

            <Pressable onPress={remove} hitSlop={9}>
              <DeleteIcon fill="#DEE0E6" />
            </Pressable>
          </Row>
        </Row>

        {event?.doctor && <Text>{event.doctor}</Text>}

        <Text color={onEdit ? 'secondary.500' : '#ccc'} fontWeight={600}>
          {formatDate(event.datetime, 'MMMM d, yyyy h:mm a')}
        </Text>
      </Column>

      {errorProcedure && <ErrorAlert error={errorProcedure}></ErrorAlert>}

      {errorAppointment && <ErrorAlert error={errorAppointment}></ErrorAlert>}
    </Box>
  );
}

export default Event;
