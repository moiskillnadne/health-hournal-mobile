import notifee, {
  TriggerType,
  TriggerNotification,
  RepeatFrequency,
  AndroidStyle,
} from '@notifee/react-native';
import { t } from 'i18next';
import { differenceInHours, set } from 'date-fns';

import { range } from '@app/utils';
import { FREQUENCY } from '@app/constants';
import { WaterNotification } from '@app/types';

import { CATEGORY_ACTIONS, NOTIFICATION_CATEGORIES, TEMPLATES } from './constants';
import {
  getAllNotifications,
  FrequencyAddTime,
  setTomorrowIf,
  getCategoryId,
  cancelCategoryNotifications,
  createChannel,
  createTriggerNotification,
} from './utils';

export async function createWaterNotification({
  frequency,
  timeRange: { from, to },
}: WaterNotification) {
  const actions = CATEGORY_ACTIONS[NOTIFICATION_CATEGORIES.WATER_INTAKE];
  const template = TEMPLATES[NOTIFICATION_CATEGORIES.WATER_INTAKE];

  const willEndNextDay = to < from;

  const fromDate = set(Date.now(), { hours: from, minutes: 0, seconds: 0 });
  const toDate = set(Date.now(), { hours: willEndNextDay ? to + 24 : to, minutes: 0, seconds: 0 });

  let notificationsCount = differenceInHours(toDate, fromDate);

  if (frequency === FREQUENCY.EVERY_HALF_HOUR) notificationsCount *= 2;
  if (frequency === FREQUENCY.EVERY_TWO_HOURS) notificationsCount /= 2;

  const channelId = await createChannel({
    id: NOTIFICATION_CATEGORIES.WATER_INTAKE,
    name: 'Water Intake notification',
  });

  function createNotification(timestamp: number) {
    return createTriggerNotification(
      {
        title: t(template.title ?? ''),
        body: t(template.body ?? ''),
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          actions: actions.map(action => ({
            title: t(action.title),
            pressAction: {
              id: action.id,
              launchActivity: action.foreground ? 'default' : undefined,
            },
          })),
          style: {
            type: AndroidStyle.BIGTEXT,
            text: t(template.body ?? ''),
          },
        },
        ios: {
          categoryId: NOTIFICATION_CATEGORIES.WATER_INTAKE,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        repeatFrequency: RepeatFrequency.DAILY,
        timestamp,
      },
    );
  }

  const addTime = FrequencyAddTime[frequency];
  const timeShifts = range(0, notificationsCount);

  await cancelCategoryNotifications(NOTIFICATION_CATEGORIES.WATER_INTAKE);

  const dates = timeShifts
    .map(timeShift => addTime(fromDate, timeShift))
    .map(date => setTomorrowIf(date, date.valueOf() < Date.now()));

  for (const date of dates) {
    await createNotification(date.valueOf());
  }
}

export function removeWaterNotifications() {
  return cancelCategoryNotifications(NOTIFICATION_CATEGORIES.WATER_INTAKE);
}
