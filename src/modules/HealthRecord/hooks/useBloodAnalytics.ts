import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';

import { useAnalytics } from './';
import { AnalyticsResponse, BloodSugar } from '../state';
import { TimeUnit } from '../types';
import { BLOOD_PRESSURE_UNITS_FORM } from '../constants';

function useBloodAnalytics(data: AnalyticsResponse<BloodSugar> | undefined, timeUnit: TimeUnit) {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const unit = BLOOD_PRESSURE_UNITS_FORM[measurementUnit];

  return useAnalytics(data, timeUnit, item => {
    const value = item.value[unit];

    return value ? +value : 0;
  });
}

export default useBloodAnalytics;
