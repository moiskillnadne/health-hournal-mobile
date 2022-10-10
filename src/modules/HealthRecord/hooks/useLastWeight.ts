import { useMemo } from 'react';
import { useAppSelector, useFetchLastWeightQuery, useFetchHeightQuery } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { MASS_UNITS } from '@app/constants';
import { getBMI } from '@app/utils';

function useLastWeight() {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const unit = MASS_UNITS[measurementUnit];

  const { data } = useFetchLastWeightQuery() ?? {};
  const { data: { value: heightValue } = {} } = useFetchHeightQuery();

  const lastValue = {
    kg: data?.weightKg ?? 0,
    lb: data?.weightLb ?? 0,
  };

  const weightStrings = useMemo(
    () => ({
      kg: data?.weightKg?.toString(),
      lb: data?.weightLb?.toString(),
    }),
    [data],
  );

  const heightStrings = useMemo(
    () => ({
      in: heightValue?.in?.toString(),
      ft: heightValue?.ft?.toString(),
      cm: heightValue?.cm?.toString(),
    }),
    [heightValue],
  );

  const goalValue = {
    kg: data?.goalWeightKg ?? 0,
    lb: data?.goalWeightLb ?? 0,
  };

  const bmi = useMemo(
    () => getBMI(weightStrings, heightStrings, measurementUnit),
    [heightStrings, weightStrings, measurementUnit],
  );

  return {
    lastValue: lastValue[unit],
    goalValue: goalValue[unit],
    bmi,
  };
}

export default useLastWeight;
