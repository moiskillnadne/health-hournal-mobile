import { object, string, number } from 'yup';

const AddHba1cSchema = object({
  hba1c: object({
    percent: number().required(),
    date: string().required(),
    time: string().required(),
  }),
  goalHba1c: number(),
});

export default AddHba1cSchema;
