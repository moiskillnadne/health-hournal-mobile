import { FREQUENCY } from '@app/constants';

export const WATER_FREQUENCY_OPTIONS = [
  { label: 'Every 30 minutes', value: FREQUENCY.EVERY_HALF_HOUR },
  { label: 'Every hour', value: FREQUENCY.HOURLY },
  { label: 'Every 2 hours', value: FREQUENCY.EVERY_TWO_HOURS },
];

const timeLabels = [
  '12AM',
  '1AM',
  '2AM',
  '3AM',
  '4AM',
  '5AM',
  '6AM',
  '7AM',
  '8AM',
  '9AM',
  '10AM',
  '11AM',
  '12PM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
  '7PM',
  '8PM',
  '9PM',
  '10PM',
  '11PM',
];

export const TIME_PERIOD_OPTIONS = timeLabels.map((label, index) => ({
  label,
  value: index.toString(),
}));
