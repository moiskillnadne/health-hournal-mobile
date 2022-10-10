import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';

import { BLOOD_PRESSURE_UNITS_FORM } from '../constants';
import { Cholesterol } from '../types';
import { LastLdlResponse, LastTriglycerideResponse } from '../state';
import { formatNumberValue } from '../utils';
import { useFetchLastLdlQuery, useFetchLastTriglycerideQuery } from '../hooks';

type CholesterolValue = {
  mgDl: number | undefined;
  mmolL: number | undefined;
};

type SelectCholesterolReturn = {
  lastValue: CholesterolValue;
  goalValue: CholesterolValue;
};

function useLastCholesterol(type: Cholesterol) {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const LDL = useFetchLastLdlQuery(undefined, {
    selectFromResult: ({ data }) => selectLastLDL(data),
  });
  const triglycerides = useFetchLastTriglycerideQuery(undefined, {
    selectFromResult: ({ data }) => selectLastTriglyceride(data),
  });

  const { lastValue, goalValue } = {
    ldl: LDL,
    triglycerides: triglycerides,
  }[type];

  const unit = BLOOD_PRESSURE_UNITS_FORM[measurementUnit];

  return {
    lastValue: formatNumberValue(lastValue[unit]),
    goalValue: formatNumberValue(goalValue[unit]),
  };
}

function selectLastLDL(value: LastLdlResponse | undefined): SelectCholesterolReturn {
  return {
    lastValue: {
      mgDl: value?.ldlMgDl,
      mmolL: value?.ldlMmolL,
    },
    goalValue: {
      mgDl: value?.goalLdlMgDl,
      mmolL: value?.goalLdlMmolL,
    },
  };
}

function selectLastTriglyceride(
  value: LastTriglycerideResponse | undefined,
): SelectCholesterolReturn {
  return {
    lastValue: {
      mgDl: value?.triglycerideMgDl,
      mmolL: value?.triglycerideMmolL,
    },
    goalValue: {
      mgDl: value?.goalTriglycerideMgDl,
      mmolL: value?.goalTriglycerideMmolL,
    },
  };
}

export default useLastCholesterol;
