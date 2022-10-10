import { object, string } from 'yup';

const AddConditionSchema = object({
  id: string().required(),
  info: string(),
});

export default AddConditionSchema;
