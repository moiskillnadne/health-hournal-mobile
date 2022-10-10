import { object, string, boolean } from 'yup';

export const AppointmentRequiredSchema = object({
  id: string().required(),
  doctor: string(),
  speciality: string(),
  date: string().required(),
  time: string().required(),
});

const AppointmentSchema = object({
  id: string(),
  doctor: string(),
  speciality: string(),
  datetime: string(),
});

const NextDoctorsAppointmentSchema = object({
  appointment: AppointmentSchema.when('hasAppointment', {
    is: 'true',
    then: AppointmentRequiredSchema,
    otherwise: AppointmentSchema,
  }),
  hasAppointment: string(),
  needToScheduleAppointment: string(),
  noScheduledAppointment: string(),
  appointmentAttached: boolean(),
});

export default NextDoctorsAppointmentSchema;
