import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';

import { MEASUREMENT_UNITS } from '../constants';

export * from './entities';

export type ApiError = {
  code: string;
  details: Record<string, any>;
  httpCode: number;
  message: string;
};

export type ValidationError = {
  type?: string;
  params?: Record<string, any>;
  message: string;
};

export type MeasurementUnit = typeof MEASUREMENT_UNITS[keyof typeof MEASUREMENT_UNITS];

export type CustomFetchBaseQueryError = {
  originalStatus: number;
  data: ApiError;
  status: number;
};

export type CustomFetchBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomFetchBaseQueryError,
  any
>;

export type ListQueryParameters = {
  take?: number;
  page?: number;
  order?: 'DESC' | 'ASC';
  search?: string;
};

export interface ListQueryResponse<T = any> {
  data: T[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
export type FormFieldProps<T = unknown> = {
  defaultValue?: T;
  label?: string;
  name: string;
  onChange?: (value: T) => void;
  isDisabled?: boolean;
};

export type Procedure = {
  id: string;
  name: string;
  description: Maybe<string>;
  tag: ProcedureTag;
  period: string;
  interval: string;
};

export type ProcedureTag =
  | 'other'
  | 'mammogram'
  | 'papSmear'
  | 'colonography'
  | 'colonoscopy'
  | 'cologuard'
  | 'bloodStoolTesting'
  | 'diabeticEyeExam';
