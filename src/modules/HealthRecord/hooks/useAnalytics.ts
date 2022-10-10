import { useMemo, useRef } from 'react';
import { sub } from 'date-fns';

import { AnalyticsResponse, AnalyticsChunk } from '../state';
import { TimeUnit, AnalyticsData } from '../types';

function useAnalytics<T, Value = number>(
  data: AnalyticsResponse<T> | undefined,
  timeUnit: TimeUnit,
  selector: (item: AnalyticsChunk<T>) => Value,
) {
  const selectorRef = useRef(selector);

  selectorRef.current = selector;

  const analytics: AnalyticsData = useMemo(
    () =>
      data?.map(item => {
        const value = selectorRef.current(item);

        return {
          value: value ? +value : 0,
          date: new Date(item.datetime),
        };
      }) ?? [],
    [data],
  );

  const values = useMemo(() => analytics.map(({ value }) => value), [analytics]);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const minValue = min - min * 0.1;
  const maxValue = max * 0.1 + max;

  const minDate = sub(new Date(), {
    days: timeUnit === 'week' ? 7 : 0,
    months: timeUnit === 'month' ? 1 : 0,
    years: timeUnit === 'year' ? 1 : 0,
  });

  const maxDate = new Date();

  return {
    analytics,
    minValue,
    maxValue,
    minDate,
    maxDate,
  };
}

export default useAnalytics;
