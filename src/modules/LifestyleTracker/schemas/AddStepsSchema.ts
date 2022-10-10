import { object, string } from 'yup';

const AddStepsSchema = object({
  steps: string().required(),
  date: string().required(),
  time: string().required(),
  goalSteps: string(),
});

export default AddStepsSchema;
