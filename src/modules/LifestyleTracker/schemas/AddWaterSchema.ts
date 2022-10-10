import { object, string, boolean } from 'yup';

import { MEASUREMENT_UNITS } from '@app/constants';

const AddWaterSchema = object({
  water: object({
    floz: string().when('$unit', {
      is: MEASUREMENT_UNITS.USA,
      then: schema => schema.required(),
    }),
    ml: string().when('$unit', {
      is: MEASUREMENT_UNITS.METRIC,
      then: schema => schema.required(),
    }),
  }),
  goalWater: object({
    floz: string(),
    ml: string(),
  }),
  reminderEnabled: boolean(),
  frequency: string().when('reminderEnabled', {
    is: true,
    then: schema => schema.required(),
  }),
  from: string().when('reminderEnabled', {
    is: true,
    then: schema => schema.required('errors.required'),
  }),
  to: string().when('reminderEnabled', {
    is: true,
    then: schema => schema.required('errors.required'),
  }),
});

export default AddWaterSchema;
