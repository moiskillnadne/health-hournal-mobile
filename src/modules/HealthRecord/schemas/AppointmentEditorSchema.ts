import { object, string } from 'yup';

const AppointmentEditorSchema = object({
  appointmentId: string().required(),
  doctor: string().nullable(),
  speciality: string().nullable(),
  date: string().required(),
  time: string().required(),
});

export default AppointmentEditorSchema;
