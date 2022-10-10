import { api } from '../state';

export { default as useTranslate } from './useTranslate';
export { default as usePersistOnChange } from './usePersistOnChange';

export const {
  useFetchRecurrenceQuery,
  useSavePersonalInfoMutation,
  useSaveHealthAssessmentMutation,
} = api;
