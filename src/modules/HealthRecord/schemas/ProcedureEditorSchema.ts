import { object, string, boolean } from 'yup';

const ProcedureEditorSchema = object({
  procedureId: string().required(),
  name: string().nullable(),
  date: string().required(),
  time: string().required(),
  repeatEnabled: boolean(),
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

export default ProcedureEditorSchema;
