import { Box, Text } from 'native-base';
import { useIsConnected } from 'react-native-offline';

import { useCommonTranslate } from '@app/hooks';

function NotificationOffline() {
  const isConnected = useIsConnected();

  const t = useCommonTranslate();

  if (isConnected != null && !isConnected)
    return (
      <Box bgColor="#dd2c00" py={2} px={4} zIndex={1} safeAreaBottom _android={{ mb: '34px' }}>
        <Text color="white" fontSize={14}>
          {t('warnings.you_in_offline_mode')}
        </Text>
      </Box>
    );

  return null;
}

export default NotificationOffline;
