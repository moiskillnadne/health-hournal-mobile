import { Box, Text } from 'native-base';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import { useFetchNotificationsCountQuery } from '@app/modules/Notifications/hooks';

import { NotificationsIcon } from './icons';

function NotificationIconButton() {
  const navigate = useNavigate();

  const { data: counter } = useFetchNotificationsCountQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  function navigateNotifications() {
    navigate('/private/notifications');
  }

  return (
    <Pressable onPress={navigateNotifications}>
      <NotificationsIcon hitSlop={{ right: 40, bottom: 40, top: 40 }} />
      {counter ? (
        <Box position="absolute" right={-4} top={-3}>
          <Box bgColor={'#f23836'} position="absolute" top={0} right={0} borderRadius={4} px={1}>
            <Text fontSize={11} fontWeight={600} color="white" textAlign={'center'}>
              {counter}
            </Text>
          </Box>
        </Box>
      ) : null}
    </Pressable>
  );
}

export default NotificationIconButton;
