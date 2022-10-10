import { evaluate } from 'mathjs';

import { MEASUREMENT_UNITS } from '@app/constants';

import { MeasurementUnit } from '../types';

const INCHES_CONVERSION_FACTOR = 703;

function cmToMeter(cm: string) {
  return Number(cm) / 100;
}

function ftToInch(fit: string) {
  return Number(fit) * 12;
}

export function getBMI(
  weight: {
    lb: Maybe<string>;
    kg: Maybe<string>;
  },
  height: {
    ft: Maybe<string>;
    in: Maybe<string>;
    cm: Maybe<string>;
  },
  unit: MeasurementUnit,
) {
  if (!weight || !height) {
    return undefined;
  }
  const factor = unit === MEASUREMENT_UNITS.USA ? INCHES_CONVERSION_FACTOR : 1;

  const measurementValues = {
    weight: unit === MEASUREMENT_UNITS.USA ? Number(weight.lb) : Number(weight.kg),
    height:
      unit === MEASUREMENT_UNITS.USA
        ? ftToInch(height.ft || '0') + Number(height.in)
        : cmToMeter(height.cm || '0'),
  };

  const result: number = evaluate(`${factor} * weight / height ^ 2`, measurementValues);

  return !!result && result !== Infinity && typeof result === 'number'
    ? String(result.toFixed(1))
    : undefined;
}
