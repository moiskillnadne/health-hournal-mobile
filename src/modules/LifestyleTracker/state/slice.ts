import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clear } from '@app/state';
import store from '@app/state/store';

import { api, AddStepsRequest, AddSleepRequest } from './api';

type Water = {
  floz: number | undefined;
  ml: number | undefined;
};

type WaterSettings = {
  water: Water;
  goalWater: Water;
  reminderEnabled: boolean;
  frequency: string;
  from: string;
  to: string;
  datetime: number;
};

export type LifestyleTackerState = {
  water: WaterSettings;

  steps: {
    steps: number | undefined;
    datetime: string;
    goalSteps: number | undefined;
  };

  sleep: {
    sleepGoal: number | undefined;
    sleepHours: number | undefined;
    datetime: string;
  };
};

const initialState: LifestyleTackerState = {
  water: {
    water: {
      floz: undefined,
      ml: undefined,
    },
    goalWater: {
      floz: undefined,
      ml: undefined,
    },
    reminderEnabled: false,
    frequency: '',
    from: '',
    to: '',
    datetime: 0,
  },

  steps: {
    steps: undefined,
    datetime: '',
    goalSteps: undefined,
  },

  sleep: {
    sleepGoal: undefined,
    sleepHours: undefined,
    datetime: '',
  },
};

const slice = createSlice({
  name: 'lifestyleTracker',
  initialState: initialState,
  reducers: {
    waterAdded: (state, action: PayloadAction<Partial<WaterSettings>>) => {
      const { water, goalWater } = action.payload;

      if (water) {
        const { ml, floz } = state.water.water;
        const { ml: payloadMl, floz: payloadFloz } = water;

        if (ml) {
          state.water.water.ml = payloadMl ? ml + payloadMl : ml;
        } else if (payloadMl) {
          state.water.water.ml = payloadMl;
        }

        if (floz) {
          state.water.water.floz = payloadFloz ? floz + payloadFloz : floz;
        } else if (payloadFloz) {
          state.water.water.floz = payloadFloz;
        }
      }

      if (goalWater) state.water.goalWater = goalWater;

      state.water.datetime = Date.now();
    },
    waterDropped: state => {
      state.water.water.floz = undefined;
      state.water.water.ml = undefined;
    },
    stepsAdded: (state, action: PayloadAction<AddStepsRequest>) => {
      const { goalSteps, steps, datetime } = action.payload;

      state.steps.steps = steps;
      state.steps.goalSteps = goalSteps ?? undefined;
      state.steps.datetime = datetime;
    },
    stepsDropped: state => {
      state.steps.steps = undefined;
    },
    sleepAdded: (state, action: PayloadAction<AddSleepRequest>) => {
      const { sleepHours, sleepGoal, datetime } = action.payload;

      state.sleep.sleepGoal = sleepGoal;
      state.sleep.datetime = datetime;
      state.sleep.sleepHours = sleepHours;
    },
    sleepDropped: state => {
      state.sleep.sleepHours = undefined;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(clear, () => {
        return initialState;
      })
      .addMatcher(api.endpoints.fetchLastWater.matchFulfilled, (state, action) => {
        const { waterFloz, waterMl, goalWaterFloz, goalWaterMl } = action.payload;

        state.water.water.floz = waterFloz;
        state.water.water.ml = waterMl;
        state.water.goalWater.floz = goalWaterFloz;
        state.water.goalWater.ml = goalWaterMl;
        state.water.datetime = Date.now();
      })
      .addMatcher(api.endpoints.fetchLastSteps.matchFulfilled, (state, action) => {
        const { goalSteps, steps, datetime } = action.payload;

        state.steps.datetime = datetime;
        state.steps.goalSteps = goalSteps;
        state.steps.steps = steps;
      })
      .addMatcher(api.endpoints.fetchLastSleep.matchFulfilled, (state, action) => {
        state.sleep = action.payload;
      });
  },
});

store.injectReducer(slice.name, slice.reducer);

export default slice;
