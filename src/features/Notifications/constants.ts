import { NOTIFICATION_CATEGORY, Action, AndroidAction, Template } from './types';

export const NOTIFICATION_CATEGORIES = {
  WATER_INTAKE: 'water_intake',

  DOCTOR_APPOINTMENT_IN_2_WEEKS: 'doctor_appointment_in_2_weeks',
  DOCTOR_APPOINTMENT_IN_1_WEEK: 'doctor_appointment_in_1_week',
  DOCTOR_APPOINTMENT_IN_1_DAY: 'doctor_appointment_in_1_day',
  DOCTOR_APPOINTMENT_1_DAY_AGO: 'doctor_appointment_1_day_ago',
  DOCTOR_APPOINTMENT_3_DAYS_AGO: 'doctor_appointment_3_days_ago',
  DOCTOR_APPOINTMENT_TO_SCHEDULE: 'doctor_appointment_to_schedule',

  DIABETIC_EYE_EXAM_TO_EXPIRE: 'diabetic_eye_exam_to_expire',
  DIABETIC_EYE_EXAM_TO_SCHEDULE: 'diabetic_eye_exam_to_schedule',
  DIABETIC_EYE_EXAM_IN_2_WEEKS: 'diabetic_eye_exam_in_2_weeks',
  DIABETIC_EYE_EXAM_IN_2_DAYS: 'diabetic_eye_exam_in_2_days',
  DIABETIC_EYE_EXAM_1_DAY_AGO: 'diabetic_eye_exam_1_day_ago',

  TRACK_TASK_ASSIGNED: 'track_tasks_assigned',
  TRACK_TASKS_UPDATED: 'track_tasks_updated',

  COLON_SCREENING_TO_EXPIRE: 'colon_screening_to_expire',
  COLON_SCREENING_TO_SCHEDULE: 'colon_screening_to_schedule',
  MAMMOGRAM: 'mammogram',
  MAMMOGRAM_TO_SCHEDULE: 'mammogram_to_schedule',
  PAP_SMEAR: 'pap_smear',
  PAP_SMEAR_TO_SCHEDULE: 'pap_smear_to_schedule',

  OTHER_PROCEDURE_TO_EXPIRE: 'other_procedure_to_expire',
  OTHER_PROCEDURE_TO_SCHEDULE: 'other_procedure_to_schedule',

  CUSTOM_VIDEO: 'custom_notification_video',
  CUSTOM_ARTICLE: 'custom_notification_article',
  CUSTOM_RECIPE: 'custom_notification_recipe',
  CUSTOM_TEXT: 'custom_notification_text',
} as const;

export const NOTIFICATION_ACTIONS = {
  ADD_WATER: 'add_water',
  WATCH_VIDEO: 'watch_video',
  READ_ARTICLE: 'read_article',
  VIEW_RECIPE: 'view_recipe',
  I_RESCHEDULE: 'i_rescheduled',
  OPEN_HEALTH_RECORD: 'open_health_record',
  REMIND_ME_LATER: 'remind_me_later',
  NO_CHANGES: 'no_changes',
  I_SCHEDULED: 'i_scheduled',
  VIEW_CONTENT: 'view_content',
  I_DO_NOT_NEED_THIS_TEST: 'i_do_not_need_this_test',
} as const;

export const CATEGORY_ACTIONS: Record<NOTIFICATION_CATEGORY, Action[]> = {
  [NOTIFICATION_CATEGORIES.WATER_INTAKE]: [
    {
      id: NOTIFICATION_ACTIONS.ADD_WATER,
      title: 'notifications.actions.add_water',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_2_WEEKS]: [
    {
      id: NOTIFICATION_ACTIONS.WATCH_VIDEO,
      title: 'notifications.actions.watch_video',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.I_RESCHEDULE,
      title: 'notifications.actions.i_rescheduled',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_WEEK]: [
    {
      id: NOTIFICATION_ACTIONS.I_RESCHEDULE,
      title: 'notifications.actions.i_rescheduled',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_DAY]: [
    {
      id: NOTIFICATION_ACTIONS.OPEN_HEALTH_RECORD,
      title: 'notifications.actions.open_health_record',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.I_RESCHEDULE,
      title: 'notifications.actions.i_rescheduled',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_3_DAYS_AGO]: [
    {
      id: NOTIFICATION_ACTIONS.OPEN_HEALTH_RECORD,
      title: 'notifications.actions.open_health_record',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.NO_CHANGES,
      title: 'notifications.actions.no_changes',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_WEEKS]: [
    {
      id: NOTIFICATION_ACTIONS.I_RESCHEDULE,
      title: 'notifications.actions.i_rescheduled',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_DAYS]: [
    {
      id: NOTIFICATION_ACTIONS.I_RESCHEDULE,
      title: 'notifications.actions.i_rescheduled',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],

  [NOTIFICATION_CATEGORIES.TRACK_TASK_ASSIGNED]: [
    {
      id: NOTIFICATION_ACTIONS.VIEW_CONTENT,
      title: 'notifications.actions.view_content',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.TRACK_TASKS_UPDATED]: [
    {
      id: NOTIFICATION_ACTIONS.VIEW_CONTENT,
      title: 'notifications.actions.view_content',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
    {
      id: NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
      title: 'notifications.actions.i_do_not_need_this_test',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
    {
      id: NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
      title: 'notifications.actions.i_do_not_need_this_test',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.MAMMOGRAM]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
    {
      id: NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
      title: 'notifications.actions.i_do_not_need_this_test',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
    {
      id: NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
      title: 'notifications.actions.i_do_not_need_this_test',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.PAP_SMEAR]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
    {
      id: NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
      title: 'notifications.actions.i_do_not_need_this_test',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
    {
      id: NOTIFICATION_ACTIONS.I_DO_NOT_NEED_THIS_TEST,
      title: 'notifications.actions.i_do_not_need_this_test',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.CUSTOM_VIDEO]: [
    {
      id: NOTIFICATION_ACTIONS.WATCH_VIDEO,
      title: 'notifications.actions.watch_video',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.CUSTOM_ARTICLE]: [
    {
      id: NOTIFICATION_ACTIONS.READ_ARTICLE,
      title: 'notifications.actions.read_article',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.CUSTOM_RECIPE]: [
    {
      id: NOTIFICATION_ACTIONS.VIEW_RECIPE,
      title: 'notifications.actions.view_recipe',
      foreground: true,
    },
  ],
  [NOTIFICATION_CATEGORIES.CUSTOM_TEXT]: [],
  [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],
  [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE]: [
    {
      id: NOTIFICATION_ACTIONS.I_SCHEDULED,
      title: 'notifications.actions.i_scheduled',
      foreground: true,
    },
    {
      id: NOTIFICATION_ACTIONS.REMIND_ME_LATER,
      title: 'notifications.actions.remind_me_later',
      foreground: false,
    },
  ],
};

export const ANDROID_CATEGORY_ACTIONS_MAP: Record<NOTIFICATION_CATEGORY, AndroidAction> = {
  [NOTIFICATION_CATEGORIES.WATER_INTAKE]: {
    'Add Water': CATEGORY_ACTIONS[NOTIFICATION_CATEGORIES.WATER_INTAKE][0],
  },
  [NOTIFICATION_CATEGORIES.CUSTOM_RECIPE]: {},
  [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_EXPIRE]: {},
  [NOTIFICATION_CATEGORIES.COLON_SCREENING_TO_SCHEDULE]: {},
  [NOTIFICATION_CATEGORIES.CUSTOM_ARTICLE]: {},
  [NOTIFICATION_CATEGORIES.CUSTOM_RECIPE]: {},
  [NOTIFICATION_CATEGORIES.CUSTOM_TEXT]: {},
  [NOTIFICATION_CATEGORIES.CUSTOM_VIDEO]: {},
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_1_DAY_AGO]: {},
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_DAYS]: {},
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_IN_2_WEEKS]: {},
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_EXPIRE]: {},
  [NOTIFICATION_CATEGORIES.DIABETIC_EYE_EXAM_TO_SCHEDULE]: {},
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_1_DAY_AGO]: {},
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_3_DAYS_AGO]: {},
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_DAY]: {},
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_1_WEEK]: {},
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_IN_2_WEEKS]: {},
  [NOTIFICATION_CATEGORIES.DOCTOR_APPOINTMENT_TO_SCHEDULE]: {},
  [NOTIFICATION_CATEGORIES.MAMMOGRAM]: {},
  [NOTIFICATION_CATEGORIES.MAMMOGRAM_TO_SCHEDULE]: {},
  [NOTIFICATION_CATEGORIES.PAP_SMEAR]: {},
  [NOTIFICATION_CATEGORIES.PAP_SMEAR_TO_SCHEDULE]: {},
  [NOTIFICATION_CATEGORIES.TRACK_TASKS_UPDATED]: {},
  [NOTIFICATION_CATEGORIES.TRACK_TASK_ASSIGNED]: {},
  [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_EXPIRE]: {},
  [NOTIFICATION_CATEGORIES.OTHER_PROCEDURE_TO_SCHEDULE]: {},
};

export const TEMPLATES: Record<string, Template> = {
  [NOTIFICATION_CATEGORIES.WATER_INTAKE]: {
    title: 'notifications.titles.water_reminder',
    body: 'notifications.descriptions.water_reminder',
  },
} as const;
