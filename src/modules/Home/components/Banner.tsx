import { useMemo } from 'react';
import { Row, Box, Text } from 'native-base';

import { useFetchEventsQuery } from '@app/hooks';
import { formatDate } from '@app/utils';

import { AppointmentIcon } from './icons';
import { useTranslate } from '../hooks';

function Banner() {
  const t = useTranslate();

  const { data: events } = useFetchEventsQuery();

  const nextVisit = useMemo(() => {
    if (events?.current) {
      const minDate = new Date(
        Math.min(
          ...events.current.map(element => {
            return new Date(element.datetime).getTime();
          }),
        ),
      );

      return events.current.find(item => new Date(item.datetime).getTime() === minDate?.getTime());
    }
  }, [events]);

  return (
    <Row bgColor={'rgba(255, 255, 255, 0.3)'} py={2} px={4} alignItems="center">
      <AppointmentIcon />

      {!nextVisit ? (
        <Text color="white" ml={2.5}>
          {t('banner.you_have_no_appointment_scheduled')}
        </Text>
      ) : null}

      {nextVisit ? (
        <>
          <Row justifyContent={'space-between'} ml={2.5} flex={1}>
            <Box justifyContent="center">
              <Text color="white" fontWeight={600}>
                {nextVisit?.appointmentId
                  ? t('banner.next_appointment')
                  : t('banner.next_procedure')}
              </Text>

              {nextVisit?.doctor ? (
                <Text fontSize={14} color="white" numberOfLines={1}>
                  {nextVisit?.doctor}
                </Text>
              ) : null}
            </Box>

            <Text color="white" fontWeight={600} textAlign="right" flex={1} paddingLeft={1}>
              {nextVisit && formatDate(nextVisit.datetime, 'MMMM d, yyyy h:mm a')}
            </Text>
          </Row>
        </>
      ) : null}
    </Row>
  );
}

export default Banner;
