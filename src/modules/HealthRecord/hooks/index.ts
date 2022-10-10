import { api } from '../state';

export { default as useTranslate } from './useTranslate';
export { default as useLastBloodSugar } from './useLastBloodSugar';
export { default as useBloodAnalytics } from './useBloodAnalytics';
export { default as useLastCholesterol } from './useLastCholesterol';
export { default as useAnalytics } from './useAnalytics';
export { default as useLastWeight } from './useLastWeight';
export { default as useWeightAnalytics } from './useWeightAnalytics';
export { default as useCholesterolAnalytics } from './useCholesterolAnalytics';
export { default as useBloodPressureAnalytics } from './useBloodPressureAnalytics';
export { default as useLastBloodPressure } from './useLastBloodPressure';
export { default as useLastHbA1c } from './useLastHbA1c';
export { default as useHbA1cAnalytics } from './useHbA1cAnalytics';

export const {
  useFetchUserMedicationsQuery,
  useFetchLastBloodPressureQuery,
  useRemoveMedicationMutation,
  useAddMedicationMutation,
  useUpdateMedicationMutation,
  useAddWeightMutation,
  useAddBloodPressureMutation,
  useFetchLastRandomBloodSugarQuery,
  useAddRandomBloodSugarMutation,
  useFetchLastFastingBloodSugarQuery,
  useAddFastingBloodSugarMutation,
  useFetchLastAfterMealBloodSugarQuery,
  useAddAfterMealBloodSugarMutation,
  useFetchLastHba1cQuery,
  useAddHba1cMutation,
  useFetchLastLdlQuery,
  useAddLdlMutation,
  useFetchLastTriglycerideQuery,
  useAddTriglycerideMutation,
  useFetchRandomBloodSugarQuery,
  useFetchFastingBloodSugarQuery,
  useFetchAfterMealBloodSugarQuery,
  useFetchUserCurrentConditionsQuery,
  useFetchUserResolvedConditionsQuery,
  useAddConditionMutation,
  useResolveConditionMutation,
  useFetchAdditionalInfoQuery,
  useUpdateAdditionInfoMutation,
  useFetchLdlQuery,
  useFetchTriglyceridesQuery,
  useFetchProceduresQuery,
  useFetchProcedurePeriodsQuery,
  useFetchProcedureFrequencyQuery,
  useAddProcedureMutation,
  useUpdateProcedureMutation,
  useRemoveProcedureMutation,
  useRemoveAppointmentMutation,
  useFetchProcedureEntityQuery,
  useAddAppointmentMutation,
  useFetchAppointmentEntityQuery,
  useUpdateAppointmentMutation,
  useFetchWeightQuery,
  useFetchBloodPressureQuery,
  useFetchHba1cQuery,
} = api;
