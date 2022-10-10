import { object, string, array, boolean } from 'yup';

const ConditionsSchema = object({
  conditions: array()
    .of(
      object({
        id: string(),
        name: string(),
        value: boolean(),
        info: string().nullable(),
      }),
    )
    .nullable(),
});

export default ConditionsSchema;
