/* eslint-disable @typescript-eslint/require-await */
import notifee from '@notifee/react-native';

import { remindBackgroundNotification, stopBackgroundNotification } from '@app/services';

import { NOTIFICATION_CATEGORIES, NOTIFICATION_ACTIONS } from '../constants';
import { getCategoryId } from '../utils';
import { FirebaseNotification } from '../types';

type Action = (payload: any) => void;
type NotificationPayload = Pick<FirebaseNotification, 'data'>['data'];
type ActionHandlers = Record<string, Record<string, Action>>;

const ALLOWED_BG_ACTIONS = [
  NOTIFICATION_ACTIONS.REMIND_ME_LATER,
  NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
];

const pressActionsHandlers: ActionHandlers = {
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE,
        });
      }
    },
    [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
      userId,
      userProcedureId,
    }: NotificationPayload) => {
      if (userId && userProcedureId) {
        return stopBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE,
          procedureId: userProcedureId,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE,
        });
      }
    },
    [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
      userId,
      userProcedureId,
    }: NotificationPayload) => {
      if (userId && userProcedureId) {
        return stopBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE,
          procedureId: userProcedureId,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.MAMMOGRAM]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({ userId, type: NOTIFICATION_CATEGORIES.MAMMOGRAM });
      }
    },
    [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
      userId,
      userProcedureId,
    }: NotificationPayload) => {
      if (userId && userProcedureId) {
        return stopBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.MAMMOGRAM,
          procedureId: userProcedureId,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE,
        });
      }
    },
    [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
      userId,
      userProcedureId,
    }: NotificationPayload) => {
      if (userId && userProcedureId) {
        return stopBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE,
          procedureId: userProcedureId,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.PAP_SMEAR]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({ userId, type: NOTIFICATION_CATEGORIES.PAP_SMEAR });
      }
    },
    [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
      userId,
      userProcedureId,
    }: NotificationPayload) => {
      if (userId && userProcedureId) {
        return stopBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.PAP_SMEAR,
          procedureId: userProcedureId,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE,
        });
      }
    },
    [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
      userId,
      userProcedureId,
    }: NotificationPayload) => {
      if (userId && userProcedureId) {
        return stopBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE,
          procedureId: userProcedureId,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE,
        });
      }
    },
  },

  [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE]: {
    [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId }: NotificationPayload) => {
      if (userId) {
        return remindBackgroundNotification({
          userId,
          type: NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE,
        });
      }
    },
  },
} as const;

export default function watchBackgroundEvent() {
  notifee.onBackgroundEvent(async ({ detail }) => {
    const { notification } = detail;

    if (!notification) return;

    const categoryId = getCategoryId(notification) as keyof typeof pressActionsHandlers;

    if (!categoryId) return;

    const actionId = detail.pressAction?.id as typeof ALLOWED_BG_ACTIONS[0];

    const pressAction = pressActionsHandlers[categoryId]?.[actionId];

    if (pressAction) {
      pressAction(notification?.data);
    }
  });
}
