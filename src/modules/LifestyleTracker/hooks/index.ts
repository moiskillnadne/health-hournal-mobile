import { api } from '../state';

export { default as useTranslate } from './useTranslate';
export { default as useWaterDrop } from './useWaterDrop';

export const {
  useFetchLastWaterQuery,
  useAddWaterMutation,
  useFetchLastStepsQuery,
  useAddStepsMutation,
  useFetchLastSleepQuery,
  useAddSleepMutation,
} = api;
