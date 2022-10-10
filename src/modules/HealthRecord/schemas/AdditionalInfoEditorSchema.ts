import { object, string } from 'yup';

const AdditionalInfoEditorSchema = object({
  value: string(),
});

export default AdditionalInfoEditorSchema;
