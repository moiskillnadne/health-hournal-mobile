import { useState } from 'react';
import { Row } from 'native-base';

import { CATEGORY_ACTIONS, NOTIFICATION_ACTIONS } from '@app/features/Notifications/constants';
import { NOTIFICATION_CATEGORY, FirebaseNotification } from '@app/features/Notifications/types';
import { getCategoryId } from '@app/features/Notifications';
import { useLocalNotifications, useCommonTranslate } from '@app/hooks';
import { ErrorAlert } from '@app/components';
import { ApiError, ValueOf } from '@app/types';

import ActionButton from './ActionButton';

type Props = {
  notification: FirebaseNotification;
  onNotificationHandled: (action: ValueOf<typeof NOTIFICATION_ACTIONS>) => void;
};

function ActionButtonsGroup({ notification, onNotificationHandled }: Props) {
  const globalT = useCommonTranslate();

  const [error, setError] = useState<Maybe<ApiError>>(null);

  const { pressActionsHandlers } = useLocalNotifications();

  const categoryId = getCategoryId(notification);

  const {
    data: { id: notificationId },
  } = notification;

  function onActionPress(
    categoryId: NOTIFICATION_CATEGORY,
    action: ValueOf<typeof NOTIFICATION_ACTIONS>,
  ) {
    const pressAction = pressActionsHandlers[categoryId]?.[action];
    setError(null);

    if (pressAction && notificationId) {
      pressAction(notification.data)
        .then(() => {
          onNotificationHandled(action);
        })
        .catch((error: ApiError) => setError(error));
    }
  }

  return (
    <>
      <Row space={2.5} flexWrap="wrap">
        {categoryId &&
          CATEGORY_ACTIONS[categoryId]?.map(item => (
            <ActionButton
              key={item.id}
              text={globalT(item.title)}
              onPress={() => onActionPress(categoryId, item.id)}
            />
          ))}
      </Row>

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default ActionButtonsGroup;
