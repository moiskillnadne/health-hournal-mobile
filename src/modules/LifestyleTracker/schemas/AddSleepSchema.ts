import { object, string } from 'yup';

const AddSleepSchema = object({
  sleepHours: string()
    .required()
    .test({
      name: 'less than 24',
      test: value => !value || +value <= 24,
      message: 'errors.format',
    }),
  date: string().required(),
  time: string().required(),
  sleepGoal: string().test({
    name: 'less than 24',
    test: value => !value || +value <= 24,
    message: 'errors.format',
  }),
});

export default AddSleepSchema;
