import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';

import { BLOOD_PRESSURE_UNITS_FORM } from '../constants';
import { BloodTest } from '../types';
import {
  LastRandomBloodSugarResponse,
  LastFastingBloodSugarResponse,
  LastAfterMealBloodSugarResponse,
} from '../state';

import {
  useFetchLastRandomBloodSugarQuery,
  useFetchLastFastingBloodSugarQuery,
  useFetchLastAfterMealBloodSugarQuery,
} from '../hooks';
import { formatNumberValue } from '../utils';

type BloodSugar = {
  mgDl: number | undefined;
  mmolL: number | undefined;
};

type SelectBloodSugarReturn = {
  lastValue: BloodSugar;
  goalValue: BloodSugar;
};

function useLastBloodSugar(type: BloodTest) {
  const measurementUnit = useAppSelector(selectMeasurementUnit);

  const randomBloodSugar = useFetchLastRandomBloodSugarQuery(undefined, {
    selectFromResult: ({ data }) => selectLastRandomBloodSugar(data),
  });
  const fastingBloodSugar = useFetchLastFastingBloodSugarQuery(undefined, {
    selectFromResult: ({ data }) => selectLastFastingBloodSugar(data),
  });
  const afterMealBloodSugar = useFetchLastAfterMealBloodSugarQuery(undefined, {
    selectFromResult: ({ data }) => selectLastAfterMealBloodSugar(data),
  });

  const { lastValue, goalValue } = {
    random: randomBloodSugar,
    fasting: fastingBloodSugar,
    'after-meal': afterMealBloodSugar,
  }[type];

  const unit = BLOOD_PRESSURE_UNITS_FORM[measurementUnit];

  return {
    lastValue: formatNumberValue(lastValue[unit]),
    goalValue: formatNumberValue(goalValue[unit]),
  };
}

function selectLastRandomBloodSugar(
  bloodSugar: LastRandomBloodSugarResponse | undefined,
): SelectBloodSugarReturn {
  return {
    lastValue: {
      mgDl: bloodSugar?.sugarMgDl,
      mmolL: bloodSugar?.sugarMmolL,
    },
    goalValue: {
      mgDl: bloodSugar?.goalRandomBloodSugarMgDl,
      mmolL: bloodSugar?.goalRandomBloodSugarMmolL,
    },
  };
}

function selectLastFastingBloodSugar(
  bloodSugar: LastFastingBloodSugarResponse | undefined,
): SelectBloodSugarReturn {
  return {
    lastValue: {
      mgDl: bloodSugar?.sugarMgDl,
      mmolL: bloodSugar?.sugarMmolL,
    },
    goalValue: {
      mgDl: bloodSugar?.goalFastingBloodSugarMgDl,
      mmolL: bloodSugar?.goalFastingBloodSugarMmolL,
    },
  };
}

function selectLastAfterMealBloodSugar(
  bloodSugar: LastAfterMealBloodSugarResponse | undefined,
): SelectBloodSugarReturn {
  return {
    lastValue: {
      mgDl: bloodSugar?.sugarMgDl,
      mmolL: bloodSugar?.sugarMmolL,
    },
    goalValue: {
      mgDl: bloodSugar?.goalAfterMealBloodSugarMgDl,
      mmolL: bloodSugar?.goalAfterMealBloodSugarMmolL,
    },
  };
}

export default useLastBloodSugar;
