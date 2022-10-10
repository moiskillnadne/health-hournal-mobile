import { object, string, boolean } from 'yup';

const ScreeningTest = () =>
  object({
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
  });

const ScreeningTestSchema = object({
  bloodStoolTesting: ScreeningTest(),
  cologuard: ScreeningTest(),
  colonoscopy: ScreeningTest(),
  colonography: ScreeningTest(),
  noColonScreening: string(),
  noNeedColonScreening: string(),
  remindColonScreeningInThreeMonth: boolean(),
});

export default ScreeningTestSchema;
