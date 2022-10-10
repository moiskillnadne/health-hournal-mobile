import { InferType } from 'yup';

import {
  PersonalInformationSchema,
  ConditionsSchema,
  TellAboutHealthSchema,
  AnswerMoreQuestionsSchema,
  NextDoctorsAppointmentSchema,
  MedicationSchema,
  TellAboutLifestyleSchema,
  ScreeningTestSchema,
  PapSmearSchema,
  MammogramSchema,
  AppointmentRequiredSchema,
} from './schemas';

export type PersonalInformationForm = InferType<typeof PersonalInformationSchema>;

export type ConditionsForm = InferType<typeof ConditionsSchema>;

export type TellAboutHealthForm = InferType<typeof TellAboutHealthSchema>;

export type AnswerMoreQuestionsForm = InferType<typeof AnswerMoreQuestionsSchema>;

export type NextDoctorsAppointmentForm = InferType<typeof NextDoctorsAppointmentSchema>;

export type AppointmentForm = InferType<typeof AppointmentRequiredSchema>;

export type Appointment = InferType<typeof AppointmentRequiredSchema>;

export type Medication = InferType<typeof MedicationSchema>;

export type TellAboutLifestyleForm = InferType<typeof TellAboutLifestyleSchema>;

export type ScreeningTestForm = InferType<typeof ScreeningTestSchema>;

export type PapSmearForm = InferType<typeof PapSmearSchema>;

export type MammogramForm = InferType<typeof MammogramSchema>;

export type Condition = {
  id: string;
  name: string;
  value: boolean;
  info?: string;
  description?: string;
};
