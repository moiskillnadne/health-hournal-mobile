import { object, string, boolean } from 'yup';

import { BLOOD_SUGAR_REGEX, LDL_REGEX, TRIGLYCERIDE_REGEX } from '@app/constants';

const TellAboutHealthSchema = object({
  lastDiabeticEyeExam: string(),
  noDiabeticEyeExam: string(),
  nextDiabeticEyeExam: string(),
  remindDiabeticEyeExamInOneMonth: boolean(),
  hba1c: object().shape(
    {
      percent: string().when('datetime', {
        is: (value: string) => value,
        then: schema => schema.required(),
      }),
      datetime: string().when('percent', {
        is: (value: string) => value,
        then: schema => schema.required(),
      }),
    },
    [['percent', 'datetime']],
  ),
  randomBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  fastingBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  afterMealBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  ldl: object({
    mgDl: string().format(LDL_REGEX.mgDl),
    mmolL: string().format(LDL_REGEX.mmolL),
  }),
  triglyceride: object({
    mgDl: string().format(TRIGLYCERIDE_REGEX.mgDl),
    mmolL: string().format(TRIGLYCERIDE_REGEX.mmolL),
  }),
  goalHba1c: string(),
  goalRandomBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  goalFastingBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  goalAfterMealBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  goalLdl: object({
    mgDl: string().format(LDL_REGEX.mgDl),
    mmolL: string().format(LDL_REGEX.mmolL),
  }),
  cpap: string(),
});

export default TellAboutHealthSchema;
