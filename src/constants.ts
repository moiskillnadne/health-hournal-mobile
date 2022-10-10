import { Platform } from 'react-native';

export const MEASUREMENT_UNITS = {
  METRIC: 'Metric',
  USA: 'USA',
} as const;

export const MASS_UNITS = {
  [MEASUREMENT_UNITS.USA]: 'lb',
  [MEASUREMENT_UNITS.METRIC]: 'kg',
} as const;

export const VOLUME_UNITS = {
  [MEASUREMENT_UNITS.USA]: 'oz',
  [MEASUREMENT_UNITS.METRIC]: 'ml',
} as const;

export const BLOOD_PRESSURE_UNIT = 'mmHg';

export const BLOOD_SUGAR_UNITS = {
  [MEASUREMENT_UNITS.USA]: 'mg/dL',
  [MEASUREMENT_UNITS.METRIC]: 'mmol/L',
};

export const CHOLESTEROL_UNITS = {
  [MEASUREMENT_UNITS.USA]: 'mg/dL',
  [MEASUREMENT_UNITS.METRIC]: 'mmol/L',
};

export const WATER_UNITS = {
  [MEASUREMENT_UNITS.USA]: 'floz',
  [MEASUREMENT_UNITS.METRIC]: 'ml',
} as const;

export const WATER_UNITS_LABELS = {
  [MEASUREMENT_UNITS.USA]: 'fl oz',
  [MEASUREMENT_UNITS.METRIC]: 'mL',
} as const;

export const CONDITION_NAMES = {
  DIABETES_TYPE_1: 'Diabetes Type 1',
  DIABETES_TYPE_2: 'Diabetes Type 2',
  SLEEP_APNEA: 'Sleep Apnea',
  NONE_OF_ABOVE: 'None of the above',
  OTHER: 'Other',
};

export const BLOOD_SUGAR_REGEX = {
  mgDl: /^[1-9]{1}(\d{1,2})?$/,
  mmolL: /^([1-9]{1}\d{1}?|\d{1})(\.\d{1,2})?$/,
};

export const LDL_REGEX = {
  mgDl: /^[1-9]{1}(\d{1,2})?$/,
  mmolL: /^([1-9]{1}\d{1}?|\d{1})(\.\d{1,2})?$/,
};

export const TRIGLYCERIDE_REGEX = {
  mgDl: /^[1-9]{1}(\d{1,3})?$/,
  mmolL: /^([1-9]{1}\d{1}?|\d{1})(\.\d{1,2})?$/,
};

export enum FREQUENCY {
  EVERY_HALF_HOUR = 'EVERY_HALF_HOUR',
  HOURLY = 'HOURLY',
  EVERY_TWO_HOURS = 'EVERY_TWO_HOURS',
}

export const TimeInterval = {
  [FREQUENCY.EVERY_HALF_HOUR]: 30,
  [FREQUENCY.HOURLY]: 1,
  [FREQUENCY.EVERY_TWO_HOURS]: 2,
};

export const TimePeriod = {
  [FREQUENCY.EVERY_HALF_HOUR]: 'minute',
  [FREQUENCY.HOURLY]: 'hour',
  [FREQUENCY.EVERY_TWO_HOURS]: 'hour',
};

export const CONTACT_EMAIL = 'info@vitalopwellness.com';

export const STORE_SUBSCRIPTION_LINK = Platform.select({
  android: 'https://play.google.com/store/account/subscriptions',
  ios: 'itms-apps://apps.apple.com/account/subscriptions',
}) as string;
