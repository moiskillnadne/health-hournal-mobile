import { object, string } from 'yup';

import { MEASUREMENT_UNITS, LDL_REGEX, TRIGLYCERIDE_REGEX } from '@app/constants';

const AddCholesterolSchema = object({
  goalCholesterol: object({
    mgDl: string().when('$type', {
      is: 'LDL',
      then: schema => schema.format(LDL_REGEX.mgDl),
      otherwise: schema => schema.format(TRIGLYCERIDE_REGEX.mgDl),
    }),
    mmolL: string().when('$type', {
      is: 'LDL',
      then: schema => schema.format(LDL_REGEX.mmolL),
      otherwise: schema => schema.format(TRIGLYCERIDE_REGEX.mmolL),
    }),
  }),
  cholesterol: object({
    mgDl: string()
      .when('$type', {
        is: 'LDL',
        then: schema => schema.format(LDL_REGEX.mgDl),
        otherwise: schema => schema.format(TRIGLYCERIDE_REGEX.mgDl),
      })
      .when('$unit', {
        is: MEASUREMENT_UNITS.USA,
        then: schema => schema.required(),
      }),
    mmolL: string()
      .when('$type', {
        is: 'LDL',
        then: schema => schema.format(LDL_REGEX.mmolL),
        otherwise: schema => schema.format(TRIGLYCERIDE_REGEX.mmolL),
      })
      .when('$unit', {
        is: MEASUREMENT_UNITS.METRIC,
        then: schema => schema.required(),
      }),
    date: string().required(),
    time: string().required(),
  }),
});

export default AddCholesterolSchema;
