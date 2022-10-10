import { useEffect, useState } from 'react';
import { Box, FlatList, Text, Spinner } from 'native-base';

import { Header, BurgerIconButton, NotificationIconButton, Content } from '@app/components';
import { formatDate } from '@app/utils';
import { ErrorAlert, SuccessAlert } from '@app/components';
import { NOTIFICATION_ACTIONS } from '@app/features/Notifications/constants';
import { ValueOf } from '@app/types';

import { useTranslate, useFetchNotificationsQuery, useViewNotificationMutation } from '../hooks';
import { EmptyNotifications, Notification } from '../components';

function Notifications() {
  const t = useTranslate();

  const [success, setSuccess] = useState(false);

  const { data: notifications, isLoading } = useFetchNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [viewNotification, { error }] = useViewNotificationMutation();

  function onNotificationHandled(action: ValueOf<typeof NOTIFICATION_ACTIONS>) {
    if (
      NOTIFICATION_ACTIONS.REMIND_ME_LATER === action ||
      NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST === action
    ) {
      setSuccess(true);
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  useEffect(() => {
    const ids: string[] = [];

    notifications?.map(notificationGroup => {
      notificationGroup.items.map(item => {
        const {
          data: { id, isViewed },
        } = item;
        if (isViewed === 'false' && id) {
          ids.push(id);
        }
      });
    });

    if (ids.length) {
      viewNotification(ids);
    }
  }, [notifications, viewNotification]);

  return (
    <Box flex={1}>
      <Header
        title={t('titles.notifications')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      {notifications?.length || isLoading ? (
        <Content mt={4} flex={1}>
          {isLoading ? (
            <Box flex={1} justifyContent="center">
              <Spinner size="lg" color="white" />
            </Box>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={item => item.date}
              renderItem={({ item: notificationGroup }) => (
                <FlatList
                  data={notificationGroup.items}
                  mb={4}
                  ItemSeparatorComponent={() => <Box h="10px" />}
                  ListHeaderComponent={() => (
                    <Text color="white" fontSize={22} fontWeight={600} my={2.5}>
                      {formatDate(notificationGroup.date)}
                    </Text>
                  )}
                  renderItem={({ item }) => (
                    <Notification
                      key={item.datetime}
                      notification={item}
                      onNotificationHandled={onNotificationHandled}
                    />
                  )}
                />
              )}
            />
          )}
        </Content>
      ) : (
        <EmptyNotifications />
      )}

      {success && <SuccessAlert message={t('descriptions.got_it')} />}

      {error && <ErrorAlert error={error} />}
    </Box>
  );
}

export default Notifications;
