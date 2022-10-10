import { Box, Text, Button } from 'native-base';
import { useNavigate } from 'react-router-native';

import { Logo, Content } from '@app/components';

import { useTranslate } from '../hooks';
import { NotificationIcon } from '../components/icons';

function EmptyNotifications() {
  const t = useTranslate();

  const navigate = useNavigate();

  function navigateNotificationsSettings() {
    navigate('/private/settings/notifications');
  }

  return (
    <Content flex={1} alignItems="center" justifyContent="space-between">
      <Box alignItems="center" mt={32} px={4}>
        <NotificationIcon />

        <Text color="white" fontSize={22} fontWeight="600" textAlign="center" mt={7} mb={2.5}>
          {t('titles.nothing_here')}
        </Text>

        <Text color="white" textAlign="center">
          {t('accountability_is_key')}
        </Text>
      </Box>

      <Button variant={'unstyled'} bgColor="white" onPress={navigateNotificationsSettings}>
        {t('buttons.notifications_settings')}
      </Button>

      <Logo />
    </Content>
  );
}

export default EmptyNotifications;
