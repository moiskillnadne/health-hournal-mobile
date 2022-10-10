import { mergeDateAndTime } from '@app/utils';

import { AddWaterForm, AddStepsForm, AddSleepForm } from './types';
import { AddSleepRequest } from './state';

function removeComma(value?: string) {
  if (value) {
    return value.replace(/,/g, '');
  } else {
    return '';
  }
}

export const Water = {
  toAddData({ water, goalWater }: AddWaterForm) {
    return {
      water,
      goalWater,
    };
  },
};

export const Steps = {
  toAddData({ steps, goalSteps, date, time }: AddStepsForm) {
    return {
      steps: +removeComma(steps),
      goalSteps: goalSteps ? +removeComma(goalSteps) : undefined,
      datetime: mergeDateAndTime(date, time),
    };
  },
};

export const Sleep = {
  toAddData({ sleepGoal, sleepHours, date, time }: AddSleepForm): AddSleepRequest {
    return {
      sleepHours: +sleepHours,
      sleepGoal: sleepGoal ? +sleepGoal : undefined,
      datetime: mergeDateAndTime(date, time),
    };
  },
};
