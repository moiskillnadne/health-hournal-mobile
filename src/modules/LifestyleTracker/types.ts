import { InferType } from 'yup';

import { AddWaterSchema, AddStepsSchema, AddSleepSchema } from './schemas';

export type AddWaterForm = InferType<typeof AddWaterSchema>;

export type AddStepsForm = InferType<typeof AddStepsSchema>;

export type AddSleepForm = InferType<typeof AddSleepSchema>;
