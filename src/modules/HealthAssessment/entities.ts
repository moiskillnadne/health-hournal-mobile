import uuid from 'react-native-uuid';

import { Medication as TMedication } from './types';

import { Appointment as TAppointment } from './types';

export function Medication(): TMedication {
  return {
    uuid: uuid.v4() as string,
    id: '',
    frequency: undefined,
    period: '',
    amount: undefined,
    currency: '',
    name: '',
  };
}

export function Appointment(): TAppointment {
  return {
    id: '',
    doctor: '',
    speciality: undefined,
    datetime: '',
  };
}
