import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';

import { useAnalytics } from '.';
import { AnalyticsResponse, Cholesterol } from '../state';
import { TimeUnit } from '../types';
import { CHOLESTEROL_UNITS_FORM } from '../constants';

function useCholesterolAnalytics(
  data: AnalyticsResponse<Cholesterol> | undefined,
  timeUnit: TimeUnit,
) {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const unit = CHOLESTEROL_UNITS_FORM[measurementUnit];

  return useAnalytics(data, timeUnit, item => {
    const value = item.value[unit];

    return value ? +value : 0;
  });
}

export default useCholesterolAnalytics;
