import { useAnalytics } from '.';
import { AnalyticsResponse, Hba1c } from '../state';
import { TimeUnit } from '../types';

function useHbA1cAnalytics(data: AnalyticsResponse<Hba1c> | undefined, timeUnit: TimeUnit) {
  return useAnalytics(data, timeUnit, item => item.value.percent);
}

export default useHbA1cAnalytics;
