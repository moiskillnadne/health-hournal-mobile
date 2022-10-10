import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { MASS_UNITS } from '@app/constants';

import { useAnalytics } from '.';
import { AnalyticsResponse, Weight } from '../state';
import { TimeUnit } from '../types';

function useWeightAnalytics(data: AnalyticsResponse<Weight> | undefined, timeUnit: TimeUnit) {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const unit = MASS_UNITS[measurementUnit];

  return useAnalytics(data, timeUnit, item => {
    const value = item.value[unit];

    return value ? +value : 0;
  });
}

export default useWeightAnalytics;
