import { MEASUREMENT_UNITS } from '@app/constants';

export const BLOOD_PRESSURE_UNITS_FORM = {
  [MEASUREMENT_UNITS.USA]: 'mgDl',
  [MEASUREMENT_UNITS.METRIC]: 'mmolL',
} as const;

export const BLOOD_PRESSURE_MASKS = {
  [MEASUREMENT_UNITS.USA]: '999',
  [MEASUREMENT_UNITS.METRIC]: '99.99',
};

export const HBA1C_UNIT = '%';

export const CHOLESTEROL_UNITS_FORM = {
  [MEASUREMENT_UNITS.USA]: 'mgDl',
  [MEASUREMENT_UNITS.METRIC]: 'mmolL',
} as const;

export const CONDITION_STATUSES = {
  CURRENT: 'current',
  RESOLVED: 'resolved',
};

export const BLOOD_SUGAR_UNITS_FORM = {
  [MEASUREMENT_UNITS.USA]: 'mgDl',
  [MEASUREMENT_UNITS.METRIC]: 'mmolL',
} as const;
