import { object, string, boolean } from 'yup';

const PapSmearSchema = object({
  papSmear: object({
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
  noPapSmear: string(),
  noNeedPapSmear: string(),
  remindPapSmearInThreeMonth: boolean(),
});

export default PapSmearSchema;
