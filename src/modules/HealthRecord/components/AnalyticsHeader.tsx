import { Box, Center, Column, Row, Text, Pressable } from 'native-base';

import { Header, BackArrow } from '@app/components';
import { BottomLeftCornerIcon, GoalIcon } from '@app/components/icons';

import { useTranslate } from '../hooks';

import { PlusIcon } from './icons';

type Props = {
  title: string;
  value: Maybe<number | string>;
  goal: Maybe<number | string>;
  unit: string;
  goalMet: boolean;
  onAdd: () => unknown;
  renderAddons?: () => JSX.Element;
  extraInfo?: JSX.Element;
};

function AnalyticsHeader({
  title,
  value,
  unit,
  goal,
  goalMet,
  onAdd,
  renderAddons,
  extraInfo,
}: Props) {
  const t = useTranslate();

  return (
    <Header
      title={title}
      leftElement={<BackArrow />}
      _addonsContainer={{
        pb: '54px',
      }}
      renderAddons={() => (
        <>
          <Box position="absolute" bottom={0} left={0}>
            <BottomLeftCornerIcon />
          </Box>

          <Pressable hitSlop={48} position="absolute" bottom={2.5} left={2.5} onPress={onAdd}>
            <PlusIcon />
          </Pressable>

          <Box>
            {renderAddons && renderAddons()}

            <Column alignItems="center" w="full">
              <Text fontSize="72px" color="white" mb={-4}>
                {value ? value : '?'}
              </Text>

              <Text color="white" fontWeight="medium" mb={2.5}>
                {unit}
              </Text>

              {extraInfo}

              <Center w="full">
                <Text color="rgba(235, 235, 245, 0.6)" fontWeight="medium">
                  *{t('goal')} {goal ? goal : '?'} {unit}
                </Text>

                {goalMet && (
                  <Row alignItems="center" position="absolute" right={4}>
                    <GoalIcon />

                    <Text color="white" ml={2.5}>
                      {t('status.goal_met')}
                    </Text>
                  </Row>
                )}
              </Center>
            </Column>
          </Box>
        </>
      )}
    />
  );
}

export default AnalyticsHeader;
