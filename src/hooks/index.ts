import { systemApi } from '../state';

export { default as useAuth } from './useAuth';
export { default as useAppForm } from './useAppForm';
export { default as useAppDispatch } from './useAppDispatch';
export { default as useAppSelector } from './useAppSelector';
export { default as useAnimatedLabel } from './useAnimatedLabel';
export { default as useDeepLinking } from './useDeepLinking';
export { default as useStepper } from './useStepper';
export { default as useCommonTranslate } from './useCommonTranslate';
export { default as useSelectOptions } from './useSelectOptions';
export { default as useAndroidBackButton } from './useAndroidBackButton';
export { default as useValueChanges } from './useValueChanges';
export { default as useInfiniteScroll } from './useInfiniteScroll';
export { default as useDisabledFontScaling } from './useDisabledFontScaling';
export { default as useAnimatedPressable } from './useAnimatedPressable';
export { default as useKeyboardBottomInset } from './useKeyboardBottomInset';
export { default as useExitAppOnBackButton } from './useExitAppOnBackButton';
export { default as useAppStateChange } from './useAppStateChange';
export { default as useBackgroundTime } from './useBackgroundTime';
export { default as useLocalNotifications } from './useLocalNotifications';
export { default as useLocationState } from './useLocationState';
export { default as useModal } from './useModal';
export { default as useNotificationPermissionCheck } from './useNotificationPermissionCheck';
export { default as useOfflineActions } from './useOfflineActions';
export { default as useCheckFirstLaunch } from './useCheckFirstLaunch';
export { default as useBlocker } from './useBlocker';
export { default as useLogout } from './useLogout';

export const {
  useFetchGendersQuery,
  useFetchRacesQuery,
  useFetchDoseQuery,
  useFetchCurrencyQuery,
  useFetchFrequencyQuery,
  useFetchPeriodsQuery,
  useFetchMedicationListQuery,
  useFetchHba1cOptionsQuery,
  useFetchConditionsQuery,
  useFetchAppointmentsQuery,
  useFetchLastWeightQuery,
  useFetchHeightQuery,
  useFetchEventsQuery,
  useSaveNotificationSettingsMutation,
  useSaveFCMTokenMutation,
  useRemindNotificationsMutation,
  useStopNotificationsMutation,
  useFetchSettingsRemindersQuery,
  useSaveSettingsRemindersMutation,
  useFetchAppStoreIdQuery,
  useFetchProcedurePeriodsQuery,
  useFetchProceduresQuery,
} = systemApi;
