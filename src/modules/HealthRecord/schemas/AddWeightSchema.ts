import { object, string } from 'yup';

import { MEASUREMENT_UNITS } from '@app/constants';

const weightRegex = /^(?!0\d)\d{0,3}(\.\d{1})?$/;

const AddWeightSchema = object({
  weight: object().shape({
    lb: string()
      .format(weightRegex)
      .when('$unit', {
        is: MEASUREMENT_UNITS.USA,
        then: schema => schema.required(),
      }),
    kg: string()
      .format(weightRegex)
      .when('$unit', {
        is: MEASUREMENT_UNITS.METRIC,
        then: schema => schema.required(),
      }),
    date: string().required(),
    time: string().required(),
  }),
  goalWeight: object({
    lb: string().format(weightRegex),
    kg: string().format(weightRegex),
  }),
});

export default AddWeightSchema;
