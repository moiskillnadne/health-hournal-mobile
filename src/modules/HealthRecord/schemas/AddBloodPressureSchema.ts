import { object, string } from 'yup';

const AddBloodPressureSchema = object({
  systolic: string().required(),
  diastolic: string().required(),
  date: string().required(),
  time: string().required(),
  goalPressureSystolic: string(),
  goalPressureDiastolic: string(),
});

export default AddBloodPressureSchema;
