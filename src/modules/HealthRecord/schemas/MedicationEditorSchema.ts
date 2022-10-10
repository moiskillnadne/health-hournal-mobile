import { object, string, boolean } from 'yup';

const MedicationEditorSchema = object({
  id: string(),
  frequency: string().required('errors.required'),
  period: string().required('errors.required'),
  amount: string().nullable(),
  currency: string().nullable(),
  name: string().required(),
  dose: string(),
  medicationProductId: string().required(),
  status: string(),
  needMedicationAgain: boolean(),
  statusUpdated: string().nullable(),
});

export default MedicationEditorSchema;
