import { FREQUENCY } from '../constants';

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  companyCode: string;
  email: string;
  city: string;
  dateOfBirth: string;
  state: string;
  country: string;
  isQuestionnairePassed: boolean;
  isAssessmentPassed: boolean;
};

export interface KeyValue<K = string, V = string> {
  key: K;
  value: V;
}

export interface KeyValuePayload<P, K = string, V = string> extends KeyValue<K, V> {
  payload: P;
}

export interface LabelValue<V = string> {
  label: string;
  value: V;
}

export interface IdName {
  id: string;
  name: string;
}

export type ValueOf<T> = T[keyof T];

export interface Appointment {
  appointmentId: string;
  name: string;
  description: string;
  speciality: string;
  doctor: string;
  datetime: string;
}

export interface Procedure {
  procedureId: string;
  name: string;
  description: string;
  datetime: string;
  otherEventName: string;
}

export type Event = Appointment & Procedure;

type TimeRange = {
  from: number;
  to: number;
};

export type WaterNotification = {
  frequency: FREQUENCY;
  timeRange: TimeRange;
};
