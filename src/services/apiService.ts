import { request } from './httpServices';

type ReminderParams = {
  userId: string;
  type: string;
};

type StopParams = {
  userId: string;
  type: string;
  procedureId: string;
};

export function remindBackgroundNotification({ userId, type }: ReminderParams) {
  return request({
    url: 'notifications/remind',
    method: 'POST',
    data: {
      userId,
      type,
    },
  });
}

export function stopBackgroundNotification({ userId, type, procedureId }: StopParams) {
  return request({
    url: 'notifications/stop',
    method: 'POST',
    data: {
      userId,
      type,
      procedureId,
    },
  });
}
