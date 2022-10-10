import { Medication as TMedication, AppointmentEditorForm as TAppointment } from './types';

export function Medication(): TMedication {
  return {
    id: '',
    frequency: '',
    period: '',
    amount: undefined,
    currency: '',
    name: '',
    dose: '',
    medicationProductId: '',
    status: '',
    needMedicationAgain: false,
  };
}

export function Appointment(): TAppointment {
  return {
    appointmentId: '',
    doctor: '',
    speciality: null,
    datetime: '',
  };
}
