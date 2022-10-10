import { InferType } from 'yup';

import {
  MedicationEditorSchema,
  AddWeightSchema,
  AddBloodPressureSchema,
  AddBloodSugarSchema,
  AddHba1cSchema,
  AddCholesterolSchema,
  AddConditionSchema,
  AdditionalInfoEditorSchema,
  ProcedureEditorSchema,
  AppointmentEditorSchema,
} from './schemas';

export type MedicationEditorForm = InferType<typeof MedicationEditorSchema>;

export type Medication = InferType<typeof MedicationEditorSchema>;

export type AddWeightForm = InferType<typeof AddWeightSchema>;

export type AddBloodPressureForm = InferType<typeof AddBloodPressureSchema>;

export type AddBloodSugarForm = InferType<typeof AddBloodSugarSchema>;

export type AddHba1cForm = InferType<typeof AddHba1cSchema>;

export type AddCholesterolForm = InferType<typeof AddCholesterolSchema>;

export type TimeUnit = 'week' | 'month' | 'year';

export type BloodTest = 'random' | 'fasting' | 'after-meal';

export type Cholesterol = 'ldl' | 'triglycerides';

export type AnalyticsData<T = number> = { value: T; date: Date }[];

export type AddConditionForm = InferType<typeof AddConditionSchema>;

export type AdditionalInfoEditorForm = InferType<typeof AdditionalInfoEditorSchema>;

export type ProcedureEditorForm = InferType<typeof ProcedureEditorSchema>;

export type AppointmentEditorForm = InferType<typeof AppointmentEditorSchema>;
