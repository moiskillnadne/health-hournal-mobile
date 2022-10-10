import { Box, Row, Text, Pressable } from 'native-base';

import { PencilIcon } from '@app/components/icons';
import { LabelValue } from '@app/types';
import { formatDate } from '@app/utils';

import { Medication as TMedication } from '../types';
import { useTranslate } from '../hooks';

type Props = {
  medication: TMedication;
  onEdit: () => void;
  currencies?: LabelValue[];
};

function InactiveMedication({ medication, onEdit }: Props) {
  const t = useTranslate();

  return (
    <Box bgColor="white" rounded={4} py={2.5} px={3.5} mt={2.5}>
      <Row alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Text fontWeight={600} numberOfLines={1} maxWidth={'90%'}>
            {medication.name}
          </Text>

          {medication.statusUpdated ? (
            <Text mt={2.5}>
              {t('form.stopped_on')} {formatDate(medication.statusUpdated)}
            </Text>
          ) : null}
        </Box>

        <Pressable onPress={onEdit}>
          <PencilIcon fill="#DEE0E6" />
        </Pressable>
      </Row>
    </Box>
  );
}

export default InactiveMedication;
