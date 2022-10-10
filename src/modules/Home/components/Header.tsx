import { Row, HStack, Box, Text } from 'native-base';

import { BurgerIconButton, NotificationIconButton } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { selectUser } from '@app/state';

import Avatar from './Avatar';
import { useTranslate } from '../hooks';

function Header() {
  const t = useTranslate();

  const user = useAppSelector(selectUser);

  return (
    <HStack
      bg={{
        linearGradient: {
          colors: ['#3b2272', '#8452b0'],
          start: [0, 1],
          end: [1, 0],
        },
      }}
      w="full"
      safeAreaTop
    >
      <Box flex={1}>
        <Box py={2.5} px={4}>
          <Row alignItems="center" justifyContent="space-between">
            <Box zIndex={1}>
              <BurgerIconButton />
            </Box>

            <Row>
              <Avatar firstName={user?.firstName} />
              <Text color="white" fontSize={22} fontWeight={600}>
                {`${t('titles.hello')}, ${user?.firstName || ''}!`}
              </Text>
            </Row>

            <NotificationIconButton />
          </Row>
        </Box>
      </Box>
    </HStack>
  );
}

export default Header;
