/* eslint-disable @typescript-eslint/require-await */
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-native';

import {
  useForegroundEvent,
  useInitialNotification,
  getCategoryId,
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_ACTIONS,
  NOTIFICATION_CATEGORY,
} from '@features/Notifications';
import { FirebaseNotification } from '@features/Notifications/types';
import { useRemoveNotificationMutation } from '@app/modules/Notifications/hooks';

import {
  useRemindNotificationsMutation,
  useStopNotificationsMutation,
  useCommonTranslate,
} from './index';

type Action = (payload: any) => Promise<unknown>;

type PressHandlers = Record<NOTIFICATION_CATEGORY, Action>;
type ActionHandlers = Record<string, Record<string, Action>>;

type NotificationPayload = Pick<FirebaseNotification, 'data'>['data'];

function useLocalNotifications() {
  const navigate = useNavigate();

  const globalT = useCommonTranslate();

  const [remind] = useRemindNotificationsMutation();
  const [stop] = useStopNotificationsMutation();
  const [remove] = useRemoveNotificationMutation();

  const [initialNotification, clearInitialNotification] = useInitialNotification();

  const pressHandlers: PressHandlers = useMemo(() => {
    const navigateInAppNotifications = () => navigate('/private/notifications');

    const handlers: PressHandlers = {
      [NOTIFICATION_CATEGORIES.WATER_INTAKE]: async () => {
        navigate('/private/lifestyle-tracker', { state: { shouldAddWater: true } });
      },
      [NOTIFICATION_CATEGORIES.CUSTOM_TEXT]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.CUSTOM_ARTICLE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.CUSTOM_RECIPE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.CUSTOM_VIDEO]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_2_WEEKS]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_WEEK]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_DAY]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_3_DAYS_AGO]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_WEEKS]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_DAYS]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.TRACK_TASK_ASSIGNED]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.TRACK_TASKS_UPDATED]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.MAMMOGRAM]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.PAP_SMEAR]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE]: async () => {
        navigateInAppNotifications();
      },
      [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE]: async () => {
        navigateInAppNotifications();
      },
    };

    return handlers;
  }, [navigate]);

  const pressActionsHandlers: ActionHandlers = useMemo(() => {
    return {
      [NOTIFICATION_CATEGORIES.WATER_INTAKE]: {
        [NOTIFICATION_ACTIONS.ADD_WATER]: async () => {
          navigate('/private/lifestyle-tracker', { state: { shouldAddWater: true } });
        },
      },

      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_2_WEEKS]: {
        [NOTIFICATION_ACTIONS.WATCH_VIDEO]: async ({
          videoId,
          isContentValid,
        }: NotificationPayload) => {
          if (isContentValid === 'true') {
            if (videoId) {
              navigate(`/private/my-wellness-journey/videos/${videoId}`);
            }
          } else {
            return Promise.reject(globalT('errors.content_not_exist'));
          }
        },
        [NOTIFICATION_ACTIONS.I_RESCHEDULE]: async ({ appointmentId }: NotificationPayload) => {
          if (appointmentId) {
            navigate('/private/health-record/doctor_visits', {
              state: {
                appointmentId,
                shouldAddAppointment: true,
              },
            });
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_WEEK]: {
        [NOTIFICATION_ACTIONS.I_RESCHEDULE]: async ({ appointmentId }: NotificationPayload) => {
          if (appointmentId) {
            navigate('/private/health-record/doctor_visits', {
              state: {
                appointmentId,
                shouldAddAppointment: true,
              },
            });
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_DAY]: {
        [NOTIFICATION_ACTIONS.OPEN_HEALTH_RECORD]: async () => {
          navigate('/private/health-record/medications');
        },
        [NOTIFICATION_ACTIONS.I_RESCHEDULE]: async ({ appointmentId }: NotificationPayload) => {
          if (appointmentId) {
            navigate('/private/health-record/doctor_visits', {
              state: {
                appointmentId,
                shouldAddAppointment: true,
              },
            });
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ appointmentId, id }: NotificationPayload) => {
          if (appointmentId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                appointmentId,
                shouldAddAppointment: true,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_3_DAYS_AGO]: {
        [NOTIFICATION_ACTIONS.OPEN_HEALTH_RECORD]: async () => {
          navigate('/private/health-record/medications');
        },
        [NOTIFICATION_ACTIONS.NO_CHANGES]: async () => {},
      },

      [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ id }: NotificationPayload) => {
          if (id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: { shouldAddAppointment: true },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_WEEKS]: {
        [NOTIFICATION_ACTIONS.I_RESCHEDULE]: async ({ userProcedureId }: NotificationPayload) => {
          if (userProcedureId) {
            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldUpdateProcedure: true,
                procedureId: userProcedureId,
              },
            });
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_DAYS]: {
        [NOTIFICATION_ACTIONS.I_RESCHEDULE]: async ({ userProcedureId }: NotificationPayload) => {
          if (userProcedureId) {
            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldUpdateProcedure: true,
                procedureId: userProcedureId,
              },
            });
          }
        },
      },

      [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.TRACK_TASK_ASSIGNED]: {
        [NOTIFICATION_ACTIONS.VIEW_CONTENT]: async () => {
          navigate('/private/my-wellness-journey/videos');
        },
      },

      [NOTIFICATION_CATEGORIES.TRACK_TASKS_UPDATED]: {
        [NOTIFICATION_ACTIONS.VIEW_CONTENT]: async () => {
          navigate('/private/my-wellness-journey/videos');
        },
      },

      [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (userId && id) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
        [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
          userId,
          userProcedureId,
          id,
        }: NotificationPayload) => {
          if (id && userId) {
            await stop({
              userId,
              type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE,
              procedureId: userProcedureId,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
        [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
          userId,
          id,
        }: NotificationPayload) => {
          if (id && userId) {
            await stop({
              userId,
              type: NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.MAMMOGRAM]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({ userId, type: NOTIFICATION_CATEGORIES.MAMMOGRAM }).unwrap();

            return remove(id).unwrap();
          }
        },
        [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
          userId,
          userProcedureId,
          id,
        }: NotificationPayload) => {
          if (id && userId) {
            await stop({
              userId,
              type: NOTIFICATION_CATEGORIES.MAMMOGRAM,
              procedureId: userProcedureId,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({ userId, type: NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE }).unwrap();

            return remove(id).unwrap();
          }
        },
        [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
          userId,
          id,
        }: NotificationPayload) => {
          if (id && userId) {
            await stop({
              userId,
              type: NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.PAP_SMEAR]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({ userId, type: NOTIFICATION_CATEGORIES.PAP_SMEAR }).unwrap();

            return remove(id).unwrap();
          }
        },
        [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
          userId,
          userProcedureId,
          id,
        }: NotificationPayload) => {
          if (id && userId) {
            await stop({
              userId,
              type: NOTIFICATION_CATEGORIES.PAP_SMEAR,
              procedureId: userProcedureId,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({ userId, type: NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE }).unwrap();

            return remove(id).unwrap();
          }
        },
        [NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST]: async ({
          userId,
          id,
        }: NotificationPayload) => {
          if (id && userId) {
            await stop({
              userId,
              type: NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE]: {
        [NOTIFICATION_ACTIONS.I_SCHEDULED]: async ({ procedureId, id }: NotificationPayload) => {
          if (procedureId && id) {
            await remove(id).unwrap();

            navigate('/private/health-record/doctor_visits', {
              state: {
                shouldAddProcedure: true,
                preselectedProcedureId: procedureId,
              },
            });
          }
        },
        [NOTIFICATION_ACTIONS.REMIND_ME_LATER]: async ({ userId, id }: NotificationPayload) => {
          if (id && userId) {
            await remind({
              userId,
              type: NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE,
            }).unwrap();

            return remove(id).unwrap();
          }
        },
      },

      [NOTIFICATION_CATEGORIES.CUSTOM_VIDEO]: {
        [NOTIFICATION_ACTIONS.WATCH_VIDEO]: async ({
          videoId,
          isContentValid,
        }: NotificationPayload) => {
          if (isContentValid === 'true') {
            if (videoId) {
              navigate(`/private/my-wellness-journey/videos/${videoId}`);
            }
          } else {
            return Promise.reject(globalT('errors.content_not_exist'));
          }
        },
      },

      [NOTIFICATION_CATEGORIES.CUSTOM_ARTICLE]: {
        [NOTIFICATION_ACTIONS.READ_ARTICLE]: async ({
          articleId,
          isContentValid,
        }: NotificationPayload) => {
          if (isContentValid === 'true') {
            if (articleId) {
              navigate(`/private/my-wellness-journey/articles/${articleId}`);
            }
          } else {
            return Promise.reject(globalT('errors.content_not_exist'));
          }
        },
      },

      [NOTIFICATION_CATEGORIES.CUSTOM_RECIPE]: {
        [NOTIFICATION_ACTIONS.VIEW_RECIPE]: async ({
          recipeId,
          isContentValid,
        }: NotificationPayload) => {
          if (isContentValid === 'true') {
            if (recipeId) {
              navigate(`/private/my-wellness-journey/recipes/${recipeId}`);
            }
          } else {
            return Promise.reject(globalT('errors.content_not_exist'));
          }
        },
      },
    };
  }, [navigate, remind, stop, remove, globalT]);

  useForegroundEvent({
    onPress: details => {
      const { notification } = details;

      if (!notification) return;

      const categoryId = getCategoryId(notification);

      if (!categoryId) return;

      const pressAction = pressHandlers[categoryId];

      if (pressAction) {
        pressAction(notification?.data);
      }
    },
    onActionPress: details => {
      const { notification } = details;

      if (!notification) return;

      const categoryId = getCategoryId(notification);

      if (!categoryId) return;

      const actionId = details.pressAction?.id as string;
      const pressAction = pressActionsHandlers[categoryId]?.[actionId];

      if (pressAction) {
        pressAction(notification?.data);
      }
    },
  });

  useEffect(() => {
    if (initialNotification) {
      const { notification, pressAction } = initialNotification;

      const categoryId = getCategoryId(notification);

      if (!categoryId) return;

      const action =
        pressAction.id === 'default'
          ? pressHandlers[categoryId]
          : pressActionsHandlers[categoryId]?.[pressAction.id];

      if (action) {
        action(notification?.data);
      }

      clearInitialNotification();
    }
  }, [clearInitialNotification, initialNotification, pressActionsHandlers, pressHandlers]);

  return { pressActionsHandlers };
}

export default useLocalNotifications;
