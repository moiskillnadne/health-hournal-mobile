import { Column, Row, Box, Divider, Text } from 'native-base';

import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { formatDate } from '@app/utils';

import { AnalyticsData } from '../types';

type Props = {
  unit: string;
  records: AnalyticsData<string | number>;
};

function RecordHistory({ unit, records }: Props) {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const formatNumber = (value: number) =>
    `${measurementUnit === 'Metric' ? value.toFixed(2) : value} ${unit}`;

  const format = (value: number | string) =>
    typeof value === 'string' ? value : formatNumber(value);

  return (
    <Box
      borderColor="#e9e9e9"
      bgColor="white"
      borderWidth={records.length ? 1 : 0}
      borderRadius={4}
    >
      <Column divider={<Divider />}>
        {records.map((record, i) => {
          const time = record.date.getTime();

          return (
            <Row key={time + i} px={4} py={3} justifyContent="space-between">
              <Text opacity={0.5}>{formatDate(time, 'MMMM d, Y')}</Text>

              <Text fontWeight="medium">{format(record.value)}</Text>
            </Row>
          );
        })}
      </Column>
    </Box>
  );
}

export default RecordHistory;
