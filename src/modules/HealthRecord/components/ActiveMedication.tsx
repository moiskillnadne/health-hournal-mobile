import { Box, Row, Text, Pressable } from 'native-base';

import { PencilIcon } from '@app/components/icons';
import { LabelValue } from '@app/types';

import { transformMoney, stringifyPeriod } from '../utils';
import { Medication as TMedication } from '../types';

type Props = {
  medication: TMedication;
  onEdit: () => void;
  currencies?: LabelValue[];
};

function ActiveMedication({ medication, onEdit, currencies }: Props) {
  return (
    <Row
      bgColor="white"
      rounded={4}
      py={2.5}
      px={3.5}
      mb={2.5}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box maxWidth={'90%'}>
        <Text fontWeight={600} numberOfLines={1}>
          {medication.name}
        </Text>

        <Row mt={2.5} alignItems="center" flexWrap={'wrap'}>
          <Text>{medication.dose}</Text>

          {medication.frequency ? (
            <Row alignItems="center">
              <Box w={1} h={1} bgColor="#9b57d3" rounded={2} mx={2.5} />

              <Text>{stringifyPeriod(medication.frequency, medication.period)}</Text>
            </Row>
          ) : null}

          {medication.amount ? <Box w={1} h={1} bgColor="#9b57d3" rounded={2} mx={2.5} /> : null}

          {medication.amount ? (
            <Text>
              {transformMoney(medication.amount)}{' '}
              {medication.currency
                ? currencies?.find(currency => currency.value === medication.currency)?.label
                : null}
            </Text>
          ) : null}
        </Row>
      </Box>

      <Pressable onPress={onEdit}>
        <PencilIcon fill="#DEE0E6" />
      </Pressable>
    </Row>
  );
}

export default ActiveMedication;
