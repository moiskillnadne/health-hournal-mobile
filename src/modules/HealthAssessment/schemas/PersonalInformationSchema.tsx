import { object, string } from 'yup';

import { MEASUREMENT_UNITS } from '@app/constants';

const numberFormatRegex = /^(?!0\d)\d*(\.\d+)?$/;

const weightRegex = /^(?!0\d)\d{0,3}(\.\d{1})?$/;

const PersonalInformationSchema = object({
  firstName: string().required(),
  lastName: string(),
  companyCode: string(),
  dateOfBirth: string().required(),
  city: string().required(),
  state: string().required(),
  country: string().required(),
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
  }),
  height: object({
    ft: string()
      .format(numberFormatRegex)
      .when('$unit', {
        is: MEASUREMENT_UNITS.USA,
        then: schema => schema.required(),
      }),
    in: string()
      .format(numberFormatRegex)
      .when('$unit', {
        is: MEASUREMENT_UNITS.USA,
        then: schema => schema.required(),
      }),
    cm: string()
      .format(numberFormatRegex)
      .when('$unit', {
        is: MEASUREMENT_UNITS.METRIC,
        then: schema => schema.required(),
      }),
  }),
  goalWeight: object({
    lb: string().format(weightRegex),
    kg: string().format(weightRegex),
  }),
  gender: string(),
  genderId: string().required(),
  raceId: string().required(),
});

export default PersonalInformationSchema;
