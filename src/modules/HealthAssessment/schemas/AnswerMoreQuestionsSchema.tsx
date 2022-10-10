import { object, string, boolean, array } from 'yup';

export const MedicationSchema = object({
  id: string(),
  frequency: string(),
  period: string(),
  amount: string(),
  currency: string(),
  name: string(),
  uuid: string(),
});

const AnswerMoreQuestionsSchema = object({
  medications: array(MedicationSchema),
  goalPressureSystolic: string().max(3),
  goalPressureDiastolic: string().max(3),
  bloodPressure: object().shape(
    {
      systolic: string()
        .max(3)
        .when('diastolic', {
          is: (value: string) => value,
          then: schema => schema.required(),
        })
        .when('datetime', {
          is: (value: string) => value,
          then: schema => schema.required(),
        }),
      diastolic: string()
        .max(3)
        .when('systolic', {
          is: (value: string) => value,
          then: schema => schema.required(),
        })
        .when('datetime', {
          is: (value: string) => value,
          then: schema => schema.required(),
        }),
      datetime: string()
        .when('systolic', {
          is: (value: string) => value,
          then: schema => schema.required(),
        })
        .when('diastolic', {
          is: (value: string) => value,
          then: schema => schema.required(),
        }),
    },
    [
      ['systolic', 'diastolic'],
      ['systolic', 'datetime'],
      ['diastolic', 'datetime'],
    ],
  ),

  noBloodPressureCheck: boolean(),
});

export default AnswerMoreQuestionsSchema;
