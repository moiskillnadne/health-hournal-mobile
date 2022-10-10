import { object, string } from 'yup';

import { MEASUREMENT_UNITS } from '@app/constants';
import { BLOOD_SUGAR_REGEX } from '@app/constants';

const AddBloodSugarSchema = object({
  goalBloodSugar: object({
    mgDl: string().format(BLOOD_SUGAR_REGEX.mgDl),
    mmolL: string().format(BLOOD_SUGAR_REGEX.mmolL),
  }),
  bloodSugar: object({
    mgDl: string()
      .format(BLOOD_SUGAR_REGEX.mgDl)
      .when('$unit', {
        is: MEASUREMENT_UNITS.USA,
        then: schema => schema.required(),
      }),
    mmolL: string()
      .format(BLOOD_SUGAR_REGEX.mmolL)
      .when('$unit', {
        is: MEASUREMENT_UNITS.METRIC,
        then: schema => schema.required(),
      }),
    date: string().required(),
    time: string().required(),
  }),
});

export default AddBloodSugarSchema;
