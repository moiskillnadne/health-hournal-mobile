import { object, string, boolean } from 'yup';

const MammogramSchema = object({
  mammogram: object({
    repeatEnabled: boolean(),
    datetime: string().when('repeatEnabled', {
      is: true,
      then: schema => schema.required('errors.required'),
    }),
    frequency: string()
      .nullable()
      .when('repeatEnabled', {
        is: true,
        then: schema => schema.required('errors.required'),
      }),
    period: string()
      .nullable()
      .when('repeatEnabled', {
        is: true,
        then: schema => schema.required('errors.required'),
      }),
  }),
  noMammogram: string(),
  noNeedMammogram: string(),
  remindMammogramInThreeMonth: boolean(),
});

export default MammogramSchema;
