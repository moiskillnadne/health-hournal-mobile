import { Box, Text, Row, Button, Pressable, Center } from 'native-base';

import { formatDate } from '@app/utils';
import { HintIcon } from '@app/components/icons';
import { useCommonTranslate } from '@app/hooks';

type Props = {
  title: string;
  date?: string;
  value: Maybe<number | string>;
  unit: string;
  goalValue: Maybe<number | string>;
  onAdd: () => void;
  description?: string;
  icon?: Element;
};

function Card({ title, date, value, unit, goalValue, onAdd, description, icon }: Props) {
  const globalT = useCommonTranslate();

  return (
    <Box flex={1} bgColor="white" rounded={4} p={0.5} justifyContent="space-between">
      <Box px={2} pt={2.5}>
        <Row alignItems="center">
          {icon}

          <Text mx={1.5} fontWeight={600}>
            {title}
          </Text>

          {description ? (
            <Pressable ml={1} hitSlop={30}>
              <HintIcon>{description}</HintIcon>
            </Pressable>
          ) : null}
        </Row>

        <Text mt={1.5} opacity={0.5} lineHeight={16}>
          {date ? formatDate(date) : null}
        </Text>
      </Box>

      <Center mt={5}>
        <Text fontSize={36} fontWeight={600}>
          {value ? value : '?'}
        </Text>

        <Text>{unit}</Text>

        <Text mt={2.5} opacity={0.5}>
          *{globalT('goal')} {goalValue ? goalValue : '?'} {unit}
        </Text>
      </Center>

      <Button mt={2.5} onPress={onAdd}>
        {globalT('add')}
      </Button>
    </Box>
  );
}

export default Card;
