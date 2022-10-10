import { Text, Row, Box, Pressable } from 'native-base';

import { ErrorAlert } from '@app/components';
import { ValueOf } from '@app/types';
import { formatDate } from '@app/utils';

import { CONDITION_STATUSES } from '../constants';
import { TickIcon } from './icons';
import { useTranslate, useResolveConditionMutation } from '../hooks';

type Props = {
  conditionId: string;
  name: string;
  status: ValueOf<typeof CONDITION_STATUSES>;
  info: Maybe<string>;
  conditionResolvedDate: Maybe<string>;
};

function Condition({ conditionId, name, info, status, conditionResolvedDate }: Props) {
  const t = useTranslate();

  const [resolveCondition, { error }] = useResolveConditionMutation();

  function resolve() {
    resolveCondition({ conditionId });
  }

  return (
    <>
      <Row px={3.5} py={4} bgColor={'white'} rounded={4} justifyContent="space-between">
        <Box maxWidth="70%">
          <Text fontWeight={600}>{info ? info : name}</Text>

          {conditionResolvedDate ? (
            <Text mt={1}>
              {t('form.resolved_on')} {formatDate(conditionResolvedDate)}
            </Text>
          ) : null}
        </Box>

        {status === CONDITION_STATUSES.CURRENT ? (
          <Pressable onPress={resolve}>
            <Text fontSize={14} fontWeight={600} opacity={0.5}>
              {t('buttons.resolve')}
            </Text>
          </Pressable>
        ) : (
          <Row marginLeft={2.5}>
            <Text fontSize={14} fontWeight={600} color="primary.500" mr={1.5}>
              {t('status.resolved')}
            </Text>
            <TickIcon />
          </Row>
        )}
      </Row>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </>
  );
}

export default Condition;
