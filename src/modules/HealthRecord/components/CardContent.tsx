import { useState } from 'react';
import { Box, Text, Row, Button, Column } from 'native-base';
import { useIsConnected } from 'react-native-offline';

import { formatDate } from '@app/utils';
import { useCommonTranslate } from '@app/hooks';

import { useTranslate } from '../hooks';
import { ArrowRightIcon } from '../components/icons';

type Props = {
  title: string;
  date?: string;
  value: Maybe<number | string>;
  unit: string;
  goalValue: Maybe<number | string>;
  goalUnit: string;
  onAdd: () => void;
};

function CardContent({ title, date, value, unit, goalValue, goalUnit, onAdd }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const isConnected = useIsConnected();

  const [width, setWidth] = useState(0);

  return (
    <>
      <Column mt={4} space={1.5} alignItems="center">
        <Row alignItems="center">
          <Text fontWeight="bold">{title}</Text>
          <Box position="absolute" right={-25}>
            <ArrowRightIcon color={isConnected ? '#9B57D3' : '#C1C1C1'} />
          </Box>
        </Row>

        {date ? <Text opacity={0.5}>{formatDate(date)}</Text> : null}

        <Row alignItems="flex-end">
          <Text fontSize={36} fontWeight="bold">
            {value === null ? '?' : value}
          </Text>

          <Text
            lineHeight={38}
            position="absolute"
            right={-width - 5}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              setWidth(width);
            }}
          >
            {unit}
          </Text>
        </Row>

        <Text opacity={0.5}>
          *{globalT('goal')} {goalValue == null ? '?' : goalValue} {goalUnit}
        </Text>
      </Column>

      <Button mt={2.5} onPress={onAdd}>
        {t('buttons.add')}
      </Button>
    </>
  );
}

export default CardContent;
