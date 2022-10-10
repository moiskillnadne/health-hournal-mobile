import { useState } from 'react';
import { Box, Row, Text, Switch } from 'native-base';

import { NotificationIcon } from '@app/components/icons';
import { useNotificationPermissionCheck } from '@app/hooks';

import { useTranslate } from '../hooks';

function Reminder() {
  const t = useTranslate();

  const [isReminderSet, setReminder] = useState(false);

  const checkNotificationPermissions = useNotificationPermissionCheck();

  function changeReminder() {
    if (!isReminderSet) {
      checkNotificationPermissions().then(status => {
        if (status) {
          setReminder(true);
        }
      });
    } else {
      setReminder(false);
    }
  }

  return (
    <Box py={2.5} px={4}>
      <Row alignItems="center" justifyContent="space-between">
        <Box>
          <Row alignItems="center">
            <NotificationIcon />

            <Text ml={1} fontSize={12} color="#000">
              {t('form.reminder')}
            </Text>
          </Row>

          <Text ml={0.5} fontWeight={600}>
            Daily 10 AM
          </Text>
        </Box>

        <Switch isChecked={isReminderSet} onValueChange={changeReminder} />
      </Row>
    </Box>
  );
}

export default Reminder;
