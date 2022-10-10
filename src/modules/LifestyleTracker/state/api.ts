import { checkInternetConnection } from 'react-native-offline';
import { isToday } from 'date-fns';

import { baseApi } from '@app/state';

import { actions } from './';

type LastWaterResponse = {
  goalWaterFloz: number;
  goalWaterMl: number;
  id: string;
  waterFloz: number;
  waterMl: number;
};

type Water = {
  floz?: string;
  ml?: string;
};

type AddWaterRequest = {
  water: Water;
  goalWater: Water;
};

type LastStepsResponse = {
  goalSteps: number;
  id: string;
  steps: number;
  datetime: string;
};

export type AddStepsRequest = {
  steps: number;
  datetime: string;
  goalSteps?: number;
};

type LastSleepResponse = {
  sleepGoal: number;
  datetime: string;
  sleepHours: number;
  id: string;
};

export type AddSleepRequest = {
  sleepGoal?: number;
  sleepHours: number;
  datetime: string;
};

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Water-Last', 'Steps-Last', 'Sleep-Last', 'Notifications-Count'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      fetchLastWater: builder.query<LastWaterResponse, void>({
        query: () => ({
          url: 'user/water/latest',
          method: 'GET',
        }),

        providesTags: ['Water-Last'],
      }),

      addWater: builder.mutation<undefined, AddWaterRequest>({
        query: body => ({
          url: 'user/water',
          method: 'PUT',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Water-Last', 'Notifications-Count'],
        onQueryStarted(patch, { dispatch }) {
          const { water, goalWater } = patch;

          checkInternetConnection().then(isOnline => {
            if (!isOnline) {
              dispatch(
                actions.waterAdded({
                  water: {
                    floz: water.floz ? +water.floz : undefined,
                    ml: water.ml ? +water.ml : undefined,
                  },
                  goalWater: {
                    floz: goalWater.floz ? +goalWater.floz : undefined,
                    ml: goalWater.ml ? +goalWater.ml : undefined,
                  },
                }),
              );
            }
          });
        },
      }),

      fetchLastSteps: builder.query<LastStepsResponse, void>({
        query: () => ({
          url: 'user/steps/latest',
          method: 'GET',
        }),
        providesTags: ['Steps-Last', 'Notifications-Count'],
      }),

      addSteps: builder.mutation<undefined, AddStepsRequest>({
        query: body => ({
          url: 'user/steps',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Steps-Last', 'Notifications-Count'],
        onQueryStarted(patch, { dispatch }) {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(actions.stepsAdded(patch));
            }
          });
        },
      }),

      fetchLastSleep: builder.query<LastSleepResponse, void>({
        query: () => ({
          url: 'user/sleep/latest',
          method: 'GET',
        }),
        providesTags: ['Sleep-Last'],
      }),

      addSleep: builder.mutation<undefined, AddSleepRequest>({
        query: body => ({
          url: 'user/sleep',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Sleep-Last', 'Notifications-Count'],
        onQueryStarted(patch, { dispatch }) {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(actions.sleepAdded(patch));
            }
          });
        },
      }),
    }),
    overrideExisting: __DEV__,
  });
