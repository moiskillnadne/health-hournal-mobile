import { useAnalytics } from '.';
import { AnalyticsResponse, BloodPressure } from '../state';
import { TimeUnit } from '../types';

function useBloodPressureAnalytics(
  data: AnalyticsResponse<BloodPressure> | undefined,
  timeUnit: TimeUnit,
) {
  return {
    systolic: useAnalytics(data, timeUnit, item => item.value.systolic),
    diastolic: useAnalytics(data, timeUnit, item => item.value.diastolic),
  };
}

export default useBloodPressureAnalytics;
